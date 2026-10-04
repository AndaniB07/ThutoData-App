using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Thuto.Data;
using Thuto.Models;
using Thuto.Services;

namespace Thuto.Contollers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly ThutoDataContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(
        ThutoDataContext context,
        IConfiguration configuration)
    {
      _context = context;
      _configuration = configuration;
    }


    // =========================
    // REGISTER
    // POST: api/auth/register
    // =========================

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }


      // Check whether email already exists
      var existingUser = await _context.Users
          .FirstOrDefaultAsync(u =>
              u.Email.ToLower() == request.Email.ToLower());


      if (existingUser != null)
      {
        return BadRequest(new
        {
          message = "An account with this email already exists."
        });
      }


      // Create user
      var user = new User
      {
        Name = request.Name.Trim(),
        Email = request.Email.Trim().ToLower(),
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
        Grade = request.Grade
      };


      _context.Users.Add(user);

      await _context.SaveChangesAsync();


      return Ok(new
      {
        message = "Account created successfully.",
        user = new
        {
          user.UserID,
          user.Name,
          user.Email,
          user.Grade
        }
      });
    }


    // =========================
    // LOGIN
    // POST: api/auth/login
    // =========================

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }


      var user = await _context.Users
          .FirstOrDefaultAsync(u =>
              u.Email.ToLower() == request.Email.ToLower());


      if (user == null)
      {
        return Unauthorized(new
        {
          message = "Invalid email or password."
        });
      }


      // Check password
      bool passwordValid =
          BCrypt.Net.BCrypt.Verify(
              request.Password,
              user.PasswordHash
          );


      if (!passwordValid)
      {
        return Unauthorized(new
        {
          message = "Invalid email or password."
        });
      }


      // Generate JWT
      var token = GenerateToken(user);


      return Ok(new
      {
        message = "Login successful.",

        token,

        user = new
        {
          user.UserID,
          user.Name,
          user.Email,
          user.Grade
        }
      });
    }

    // =========================
    // UPDATE PROFILE
    // PUT: api/auth/profile/{id}
    // =========================

    [HttpPut("profile/{id}")]
    public async Task<IActionResult> UpdateProfile(
        int id,
        UpdateProfileRequest request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      // Find the user
      var user = await _context.Users
          .FirstOrDefaultAsync(u => u.UserID == id);

      if (user == null)
      {
        return NotFound(new
        {
          message = "User not found."
        });
      }

      // Check whether the new email belongs
      // to another account
      var existingUser = await _context.Users
          .FirstOrDefaultAsync(u =>
              u.Email.ToLower() == request.Email.ToLower() &&
              u.UserID != id);

      if (existingUser != null)
      {
        return BadRequest(new
        {
          message = "An account with this email already exists."
        });
      }

      // Update profile information
      user.Name = request.Name.Trim();
      user.Email = request.Email.Trim().ToLower();
      user.Grade = request.Grade;

      await _context.SaveChangesAsync();

      return Ok(new
      {
        message = "Profile updated successfully.",
        user = new
        {
          user.UserID,
          user.Name,
          user.Email,
          user.Grade
        }
      });
    }

    // =========================
    // FORGOT PASSWORD
    // POST: api/auth/forgot-password
    // =========================

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword(
        ForgotPasswordRequest request,
        [FromServices] EmailService emailService)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      var user = await _context.Users
          .FirstOrDefaultAsync(u =>
              u.Email.ToLower() == request.Email.ToLower());

      // Always return the same response.
      // This prevents people from discovering
      // which email addresses have accounts.
      if (user == null)
      {
        return Ok(new
        {
          message =
              "If an account exists for that email, a password reset link has been sent."
        });
      }

      // Generate a secure random token
      var randomBytes =
          System.Security.Cryptography.RandomNumberGenerator
              .GetBytes(32);

      var rawToken =
          Microsoft.AspNetCore.WebUtilities.WebEncoders
              .Base64UrlEncode(randomBytes);

      // Hash the token before storing it
      using var sha256 =
          System.Security.Cryptography.SHA256.Create();

      var tokenHashBytes =
          sha256.ComputeHash(
              System.Text.Encoding.UTF8.GetBytes(rawToken)
          );

      var tokenHash =
          Convert.ToBase64String(tokenHashBytes);

      // Invalidate any previous unused tokens
      var existingTokens =
          await _context.PasswordResetTokens
              .Where(t =>
                  t.UserId == user.UserID &&
                  !t.Used)
              .ToListAsync();

      foreach (var existingToken in existingTokens)
      {
        existingToken.Used = true;
      }

      // Create new reset token
      var resetToken = new PasswordResetToken
      {
        UserId = user.UserID,
        TokenHash = tokenHash,
        ExpiresAt = DateTime.UtcNow.AddMinutes(30),
        Used = false,
        CreatedAt = DateTime.UtcNow
      };

      _context.PasswordResetTokens.Add(resetToken);

      await _context.SaveChangesAsync();

      // Frontend reset-password page
      var frontendUrl =
          _configuration["Frontend:Url"];

      if (string.IsNullOrWhiteSpace(frontendUrl))
      {
        throw new InvalidOperationException(
            "Frontend URL is not configured."
        );
      }

      var resetLink =
          $"{frontendUrl.TrimEnd('/')}/reset-password?token={Uri.EscapeDataString(rawToken)}&email={Uri.EscapeDataString(user.Email)}";

      await emailService.SendPasswordResetEmailAsync(
          user.Email,
          user.Name,
          resetLink
      );

      return Ok(new
      {
        message =
            "If an account exists for that email, a password reset link has been sent."
      });
    }

    // RESET PASSWORD
    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword(
        ResetPasswordRequest request)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      if (string.IsNullOrWhiteSpace(request.Email) ||
          string.IsNullOrWhiteSpace(request.Token) ||
          string.IsNullOrWhiteSpace(request.NewPassword))
      {
        return BadRequest(new
        {
          message = "Email, token and new password are required."
        });
      }

      if (request.NewPassword.Length < 8)
      {
        return BadRequest(new
        {
          message = "Password must be at least 8 characters long."
        });
      }

      var user = await _context.Users
          .FirstOrDefaultAsync(u =>
              u.Email.ToLower() == request.Email.ToLower());

      if (user == null)
      {
        return BadRequest(new
        {
          message = "Invalid or expired password reset link."
        });
      }

      using var sha256 =
          System.Security.Cryptography.SHA256.Create();

      var tokenHashBytes =
          sha256.ComputeHash(
              System.Text.Encoding.UTF8.GetBytes(request.Token)
          );

      var tokenHash =
          Convert.ToBase64String(tokenHashBytes);

      var resetToken =
          await _context.PasswordResetTokens
              .FirstOrDefaultAsync(t =>
                  t.UserId == user.UserID &&
                  t.TokenHash == tokenHash &&
                  !t.Used);

      if (resetToken == null)
      {
        return BadRequest(new
        {
          message = "Invalid or expired password reset link."
        });
      }

      if (resetToken.ExpiresAt <= DateTime.UtcNow)
      {
        return BadRequest(new
        {
          message = "Invalid or expired password reset link."
        });
      }

      // Hash the new password using the same BCrypt
      // hashing system used during registration.
      user.PasswordHash =
          BCrypt.Net.BCrypt.HashPassword(
              request.NewPassword
          );

      // Make the token one-time use.
      resetToken.Used = true;

      await _context.SaveChangesAsync();

      return Ok(new
      {
        message = "Password reset successfully."
      });
    }




    // =========================
    // GENERATE TOKEN
    // =========================

    private string GenerateToken(User user)
    {
      var jwtKey =
          _configuration["Jwt:Key"];

      var jwtIssuer =
          _configuration["Jwt:Issuer"];

      var jwtAudience =
          _configuration["Jwt:Audience"];


      if (string.IsNullOrWhiteSpace(jwtKey))
      {
        throw new InvalidOperationException(
            "JWT key is not configured."
        );
      }


      var claims = new[]
      {
                new Claim(
                    ClaimTypes.NameIdentifier,
                    user.UserID.ToString()
                ),

                new Claim(
                    ClaimTypes.Name,
                    user.Name
                ),

                new Claim(
                    ClaimTypes.Email,
                    user.Email
                )
            };


      var key = new SymmetricSecurityKey(
          Encoding.UTF8.GetBytes(jwtKey)
      );


      var credentials =
          new SigningCredentials(
              key,
              SecurityAlgorithms.HmacSha256
          );


      var token = new JwtSecurityToken(
          issuer: jwtIssuer,
          audience: jwtAudience,
          claims: claims,
          expires: DateTime.UtcNow.AddHours(24),
          signingCredentials: credentials
      );


      return new JwtSecurityTokenHandler()
          .WriteToken(token);
    }
  }


  // =========================
  // REGISTER REQUEST
  // =========================

  public class RegisterRequest
  {
    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;

    public int? Grade { get; set; }
  }


  // =========================
  // LOGIN REQUEST
  // =========================

  public class LoginRequest
  {
    public string Email { get; set; } = string.Empty;

    public string Password { get; set; } = string.Empty;
  }

  // =========================
  // FORGOT PASSWORD REQUEST
  // =========================

  public class ForgotPasswordRequest
  {
    public string Email { get; set; } = string.Empty;
  }

  public class ResetPasswordRequest
  {
    public string Email { get; set; } = string.Empty;
    public string Token { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
  }

  // =========================
  // UPDATE PROFILE REQUEST
  // =========================

  public class UpdateProfileRequest
  {
    public string Name { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public int? Grade { get; set; }
  }

}

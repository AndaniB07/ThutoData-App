using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Thuto.Data;
using Thuto.Models;

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
}

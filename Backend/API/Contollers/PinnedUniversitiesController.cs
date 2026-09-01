using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Thuto.Data;
using Thuto.Models;

namespace Thuto.Contollers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize]
  public class PinnedUniversitiesController : ControllerBase
  {
    private readonly ThutoDataContext _context;

    public PinnedUniversitiesController(ThutoDataContext context)
    {
      _context = context;
    }

    // =========================================
    // GET SAVED UNIVERSITIES FOR LOGGED-IN USER
    // GET: api/pinneduniversities
    // =========================================

    [HttpGet]
    public async Task<IActionResult> GetPinnedUniversities()
    {
      var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

      if (string.IsNullOrEmpty(userIdClaim))
      {
        return Unauthorized();
      }

      int userId = int.Parse(userIdClaim);

      var universities = await _context.PinnedUniversities
          .Where(p => p.UserID == userId)
          .Include(p => p.University)
          .Select(p => p.University)
          .ToListAsync();

      return Ok(universities);
    }


    // =========================================
    // SAVE UNIVERSITY
    // POST: api/pinneduniversities/5
    // =========================================

    [HttpPost("{universityId}")]
    public async Task<IActionResult> PinUniversity(int universityId)
    {
      var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

      if (string.IsNullOrEmpty(userIdClaim))
      {
        return Unauthorized();
      }

      int userId = int.Parse(userIdClaim);


      // Check university exists
      var university = await _context.Universities
          .FindAsync(universityId);

      if (university == null)
      {
        return NotFound(new
        {
          message = "University not found."
        });
      }


      // Check whether already saved
      var existingPin = await _context.PinnedUniversities
          .FirstOrDefaultAsync(p =>
              p.UserID == userId &&
              p.UniversityID == universityId
          );

      if (existingPin != null)
      {
        return BadRequest(new
        {
          message = "University is already saved."
        });
      }


      var pinnedUniversity = new PinnedUniversity
      {
        UserID = userId,
        UniversityID = universityId
      };


      _context.PinnedUniversities.Add(pinnedUniversity);

      await _context.SaveChangesAsync();


      return Ok(new
      {
        message = "University saved successfully."
      });
    }


    // =========================================
    // REMOVE SAVED UNIVERSITY
    // DELETE: api/pinneduniversities/5
    // =========================================

    [HttpDelete("{universityId}")]
    public async Task<IActionResult> UnpinUniversity(int universityId)
    {
      var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

      if (string.IsNullOrEmpty(userIdClaim))
      {
        return Unauthorized();
      }

      int userId = int.Parse(userIdClaim);


      var pinnedUniversity = await _context.PinnedUniversities
          .FirstOrDefaultAsync(p =>
              p.UserID == userId &&
              p.UniversityID == universityId
          );


      if (pinnedUniversity == null)
      {
        return NotFound(new
        {
          message = "University is not saved."
        });
      }


      _context.PinnedUniversities.Remove(pinnedUniversity);

      await _context.SaveChangesAsync();


      return Ok(new
      {
        message = "University removed from saved list."
      });
    }
  }
}

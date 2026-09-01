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
  public class PinnedCoursesController : ControllerBase
  {
    private readonly ThutoDataContext _context;

    public PinnedCoursesController(ThutoDataContext context)
    {
      _context = context;
    }


    // =========================================
    // GET SAVED COURSES
    // GET: api/pinnedcourses
    // =========================================

    [HttpGet]
    public async Task<IActionResult> GetPinnedCourses()
    {
      var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

      if (string.IsNullOrEmpty(userIdClaim))
      {
        return Unauthorized();
      }

      int userId = int.Parse(userIdClaim);


      var courses = await _context.PinnedCourses
          .Where(p => p.UserID == userId)
          .Include(p => p.Course)
          .Select(p => p.Course)
          .ToListAsync();


      return Ok(courses);
    }


    // =========================================
    // SAVE COURSE
    // POST: api/pinnedcourses/5
    // =========================================

    [HttpPost("{courseId}")]
    public async Task<IActionResult> PinCourse(int courseId)
    {
      var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

      if (string.IsNullOrEmpty(userIdClaim))
      {
        return Unauthorized();
      }

      int userId = int.Parse(userIdClaim);


      // Check course exists
      var course = await _context.Courses
          .FindAsync(courseId);

      if (course == null)
      {
        return NotFound(new
        {
          message = "Course not found."
        });
      }


      // Check if already saved
      var existingPin = await _context.PinnedCourses
          .FirstOrDefaultAsync(p =>
              p.UserID == userId &&
              p.CourseID == courseId
          );


      if (existingPin != null)
      {
        return BadRequest(new
        {
          message = "Course is already saved."
        });
      }


      var pinnedCourse = new PinnedCourse
      {
        UserID = userId,
        CourseID = courseId
      };


      _context.PinnedCourses.Add(pinnedCourse);

      await _context.SaveChangesAsync();


      return Ok(new
      {
        message = "Course saved successfully."
      });
    }


    // =========================================
    // REMOVE SAVED COURSE
    // DELETE: api/pinnedcourses/5
    // =========================================

    [HttpDelete("{courseId}")]
    public async Task<IActionResult> UnpinCourse(int courseId)
    {
      var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);

      if (string.IsNullOrEmpty(userIdClaim))
      {
        return Unauthorized();
      }

      int userId = int.Parse(userIdClaim);


      var pinnedCourse = await _context.PinnedCourses
          .FirstOrDefaultAsync(p =>
              p.UserID == userId &&
              p.CourseID == courseId
          );


      if (pinnedCourse == null)
      {
        return NotFound(new
        {
          message = "Course is not saved."
        });
      }


      _context.PinnedCourses.Remove(pinnedCourse);

      await _context.SaveChangesAsync();


      return Ok(new
      {
        message = "Course removed from saved list."
      });
    }
  }
}

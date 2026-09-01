using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Thuto.Data;

namespace Thuto.Contollers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly ThutoDataContext _context;

    public UsersController(ThutoDataContext context)
    {
      _context = context;
    }

    // GET: api/users/5
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
      var user = await _context.Users
          .Where(u => u.UserID == id)
          .Select(u => new
          {
            u.UserID,
            u.Name,
            u.Email,
            u.Grade
          })
          .FirstOrDefaultAsync();

      if (user == null)
      {
        return NotFound();
      }

      return Ok(user);
    }
  }
}

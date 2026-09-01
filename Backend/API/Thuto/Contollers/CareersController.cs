using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Thuto.Data;
using Thuto.Models;

namespace Thuto.Contollers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CareersController : ControllerBase
    {
        private readonly ThutoDataContext _context;

        public CareersController(ThutoDataContext context)
        {
            _context = context;
        }

        // GET: api/careers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Career>>> GetCareers()
        {
            return await _context.Careers.ToListAsync();
        }

        // GET: api/careers/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Career>> GetCareer(int id)
        {
            var career = await _context.Careers.FindAsync(id);

            if (career == null)
            {
                return NotFound();
            }

            return career;
        }
    }
}

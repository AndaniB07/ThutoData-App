using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Thuto.Data;
using Thuto.Models;

namespace Thuto.Contollers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CourseOfferingsController : ControllerBase
    {
        private readonly ThutoDataContext _context;

        public CourseOfferingsController(ThutoDataContext context)
        {
            _context = context;
        }

        // GET: api/courseofferings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CourseOffered>>> GetCourseOfferings()
        {
            return await _context.CourseOfferings.ToListAsync();
        }

        // GET: api/courseofferings/1
        [HttpGet("{id}")]
        public async Task<ActionResult<CourseOffered>> GetCourseOffering(int id)
        {
            var courseOffering = await _context.CourseOfferings
                .FindAsync(id);

            if (courseOffering == null)
            {
                return NotFound();
            }

            return courseOffering;
        }
    }
}

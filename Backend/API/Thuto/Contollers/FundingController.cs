using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Thuto.Data;
using Thuto.Models;

namespace Thuto.Contollers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FundingController : ControllerBase
    {
        private readonly ThutoDataContext _context;

        public FundingController(ThutoDataContext context)
        {
            _context = context;
        }

        // GET: api/fundings
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Funding>>> GetFundings()
        {
            return await _context.Fundings.ToListAsync();
        }

        // GET: api/fundings/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Funding>> GetFunding(int id)
        {
            var funding = await _context.Fundings.FindAsync(id);

            if (funding == null)
            {
                return NotFound();
            }

            return funding;
        }
    }
}

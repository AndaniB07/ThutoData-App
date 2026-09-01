using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Thuto.Data;
using Thuto.Models;

namespace Thuto.Contollers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportantDatesController : ControllerBase
    {
        private readonly ThutoDataContext _context;

        public ImportantDatesController(ThutoDataContext context)
        {
            _context = context;
        }

        // GET: api/importantdates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ImportantDate>>> GetImportantDates()
        {
            return await _context.ImportantDates.ToListAsync();
        }

        // GET: api/importantdates/1
        [HttpGet("{id}")]
        public async Task<ActionResult<ImportantDate>> GetImportantDate(int id)
        {
            var importantDate = await _context.ImportantDates.FindAsync(id);

            if (importantDate == null)
            {
                return NotFound();
            }

            return importantDate;
        }
    }
}

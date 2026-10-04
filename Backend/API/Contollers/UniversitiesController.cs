using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Thuto.Data;
using Thuto.Models;

namespace Thuto.Contollers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UniversitiesController : ControllerBase
  {
    private readonly ThutoDataContext _context;

    public UniversitiesController(ThutoDataContext context)
    {
      _context = context;
    }

    // GET: api/universities
    [HttpGet]
    public async Task<ActionResult<IEnumerable<University>>> GetUniversities()
    {
      return await _context.Universities
          .ToListAsync();
    }

    // GET: api/universities/1
    [HttpGet("{id}")]
    public async Task<ActionResult> GetUniversity(int id)
    {
      var university = await _context.Universities
          .Include(u => u.Faculties)
          .Include(u => u.CourseOfferings)
              .ThenInclude(co => co.Course)
          .Include(u => u.CourseOfferings)
              .ThenInclude(co => co.Faculty)
          .Include(u => u.UniversityFundings)
              .ThenInclude(uf => uf.Funding)
          .Include(u => u.ImportantDates)
          .FirstOrDefaultAsync(u => u.UniversityID == id);

      if (university == null)
      {
        return NotFound();
      }

      var result = new
      {
        universityID = university.UniversityID,
        universityName = university.UniversityName,
        abbreviation = university.Abbreviation,
        description = university.Description,
        province = university.Province,
        city = university.City,
        institutionType = university.InstitutionType,
        universityType = university.UniversityType,
        websiteURL = university.WebsiteURL,

        faculties = university.Faculties?
              .Select(f => new
              {
                facultyID = f.FacultyID,
                universityID = f.UniversityID,
                facultyName = f.FacultyName,
                description = f.Description
              })
              .ToList(),

        courseOfferings = university.CourseOfferings?
              .Select(co => new
              {
                offeringID = co.OfferingID,
                courseID = co.CourseID,
                universityID = co.UniversityID,
                facultyID = co.FacultyID,
                apsRequirement = co.APSRequirement,
                subjectRequirements = co.SubjectRequirements,
                admissionRequirements = co.AdmissionRequirements,
                applicationInformation = co.ApplicationInformation,
                applicationURL = co.ApplicationURL,

                course = co.Course == null
                      ? null
                      : new
                      {
                        courseID = co.Course.CourseID,
                        courseName = co.Course.CourseName,
                        courseCode = co.Course.CourseCode,
                        qualificationType = co.Course.QualificationType,
                        description = co.Course.Description,
                        durationYears = co.Course.DurationYears,
                        studyLevel = co.Course.StudyLevel,
                        minimumAPS = co.Course.MinimumAPS,
                        entryRequirements = co.Course.EntryRequirements,
                        careerOpportunities = co.Course.CareerOpportunities
                      },

                faculty = co.Faculty == null
                      ? null
                      : new
                      {
                        facultyID = co.Faculty.FacultyID,
                        facultyName = co.Faculty.FacultyName
                      }
              })
              .ToList(),

        universityFundings = university.UniversityFundings?
      .Select(uf => new
      {
        fundingID = uf.FundingID,
        universityID = uf.UniversityID,

        funding = uf.Funding == null
              ? null
              : new
              {
                fundingID = uf.Funding.FundingID,
                fundingName = uf.Funding.FundingName,
                description = uf.Funding.Description
              }
      })
      .ToList(),

        importantDates = university.ImportantDates?
              .Select(d => new
              {
                importantDateID = d.DateID,
                universityID = d.UniversityID,
                title = d.Title,
                date = d.Date,
                description = d.Description
              })
              .ToList()
      };

      return Ok(result);
    }
  }
}

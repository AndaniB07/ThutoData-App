using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class Course
    {
        [Key]
        public int CourseID { get; set; }

        [Required]
        public string CourseName { get; set; }

        public string? CourseCode { get; set; }

        public string? QualificationType { get; set; }

        public string? Description { get; set; }

        public int? DurationYears { get; set; }

        public string? StudyLevel { get; set; }

        public int? MinimumAPS { get; set; }

        public string? EntryRequirements { get; set; }

        public string? CareerOpportunities { get; set; }

        // Navigation properties
        public ICollection<CourseOffered> CourseOfferings { get; set; }
        public ICollection<PinnedCourse> PinnedCourses { get; set; }
        public ICollection<CourseCareer> CourseCareers { get; set; }
    }
}

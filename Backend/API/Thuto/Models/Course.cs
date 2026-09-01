using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class Course
    {
        [Key]
        public int CourseID { get; set; }

        public int FacultyID { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        // Navigation properties
        public Faculty Faculty { get; set; }

        public ICollection<CourseOffered> CourseOfferings { get; set; }

        public ICollection<CourseCareer> CourseCareers { get; set; }

        public ICollection<PinnedCourse> PinnedCourses { get; set; }
    }
}

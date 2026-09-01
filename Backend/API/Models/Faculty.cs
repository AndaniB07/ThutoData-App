using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class Faculty
    {
        [Key]
        public int FacultyID { get; set; }

        [Required]
        public int UniversityID { get; set; }

        [Required]
        public string FacultyName { get; set; }

        public string? Description { get; set; }

        // Navigation properties
        public University? University { get; set; }

        public ICollection<CourseOffered>? CourseOfferings { get; set; }
    }
}
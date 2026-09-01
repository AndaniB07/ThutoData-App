using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class CourseOffered
    {
        [Key]
        public int CourseOfferedID { get; set; }

        public int CourseID { get; set; }

        public int UniversityID { get; set; }

        public string Requirements { get; set; }

        public string Duration { get; set; }

        public string ApplicationInformation { get; set; }

        // Navigation properties
        public Course Course { get; set; }

        public University University { get; set; }
    }
}

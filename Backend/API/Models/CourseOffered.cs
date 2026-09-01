using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class CourseOffered
    {
        [Key]
        public int OfferingID { get; set; }

        public int CourseID { get; set; }

        public int UniversityID { get; set; }

        public int FacultyID { get; set; }

        public int? APSRequirement { get; set; }

        public string? SubjectRequirements { get; set; }

        public string? AdmissionRequirements { get; set; }

        public string? ApplicationInformation { get; set; }

        public string? ApplicationURL { get; set; }

        // Navigation properties
        public Course Course { get; set; }

        public University University { get; set; }

        public Faculty Faculty { get; set; }
    }
}

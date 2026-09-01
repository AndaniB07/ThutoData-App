using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class University
    {
        [Key]
        public int UniversityID { get; set; }

        [Required]
        public string UniversityName { get; set; }

        public string? Abbreviation { get; set; }

        public string? Description { get; set; }

        public string? Province { get; set; }

        public string? City { get; set; }

        public string? InstitutionType { get; set; }

        public string? UniversityType { get; set; }

        public string? WebsiteURL { get; set; }

        // Navigation properties
        public ICollection<Faculty> Faculties { get; set; }

        public ICollection<CourseOffered> CourseOfferings { get; set; }

        public ICollection<PinnedUniversity> PinnedUniversities { get; set; }

        public ICollection<UniversityFunding> UniversityFundings { get; set; }

        public ICollection<ImportantDate> ImportantDates { get; set; }
    }
}

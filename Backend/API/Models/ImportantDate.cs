using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class ImportantDate
    {
        [Key]
        public int DateID { get; set; }

        [Required]
        public int UniversityID { get; set; }

        [Required]
        public string Title { get; set; }

        public string? Description { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string? DateType { get; set; }

        public string? URL { get; set; }

        // Navigation property
        public University? University { get; set; }
    }
}
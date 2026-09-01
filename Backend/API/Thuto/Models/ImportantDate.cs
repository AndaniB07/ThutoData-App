using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class ImportantDate
    {
        [Key]
        public int ImportantDateID { get; set; }

        public int UniversityID { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public DateTime Date { get; set; }

        // Navigation property
        public University University { get; set; }
    }
}

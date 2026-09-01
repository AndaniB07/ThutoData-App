using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class Career
    {
        [Key]
        public int CareerID { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        // Navigation property
        public ICollection<CourseCareer> CourseCareers { get; set; }
    }
}

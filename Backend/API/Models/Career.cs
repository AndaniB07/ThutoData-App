using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class Career
    {
        [Key]
        public int CareerID { get; set; }

        [Required]
        public string CareerName { get; set; }

        public string CareerDescription { get; set; }

        // Navigation property
        public ICollection<CourseCareer> CourseCareers { get; set; }
    }
}

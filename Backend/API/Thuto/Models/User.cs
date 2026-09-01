using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Email { get; set; }
      
        [Required]
        public string Password { get; set; }

        public int? Grade { get; set; }

        // Navigation properties
        public ICollection<UserDocument> UserDocuments { get; set; }
        public ICollection<PinnedCourse> PinnedCourses { get; set; }
        public ICollection<PinnedUniversity> PinnedUniversities { get; set; }
    }
}

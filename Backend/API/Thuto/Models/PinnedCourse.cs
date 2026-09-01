using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class PinnedCourse
    {
        public int UserID { get; set; }

        public int CourseID { get; set; }

        // Navigation properties
        public User User { get; set; }

        public Course Course { get; set; }
    }
}

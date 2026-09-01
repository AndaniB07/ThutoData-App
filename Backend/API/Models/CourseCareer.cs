using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class CourseCareer
    {
        public int CourseID { get; set; }

        public int CareerID { get; set; }

        // Navigation properties
        public Course Course { get; set; }

        public Career Career { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class PinnedUniversity
    {
        public int UserID { get; set; }

        public int UniversityID { get; set; }

        // Navigation properties
        public User User { get; set; }

        public University University { get; set; }
    }
}

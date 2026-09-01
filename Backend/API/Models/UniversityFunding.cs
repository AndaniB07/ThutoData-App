using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class UniversityFunding
    {
        public int UniversityID { get; set; }

        public int FundingID { get; set; }

        // Navigation properties
        public University University { get; set; }

        public Funding Funding { get; set; }
    }
}

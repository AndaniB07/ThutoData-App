using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class Funding
    {
        [Key]
        public int FundingID { get; set; }

        [Required]
        public string Name { get; set; }

        public string Description { get; set; }

        public string Eligibility { get; set; }

        public string ApplicationInformation { get; set; }

        public string WebsiteURL { get; set; }

        // Navigation property
        public ICollection<UniversityFunding> UniversityFundings { get; set; }
    }
}

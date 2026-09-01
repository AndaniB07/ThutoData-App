using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class Funding
    {
        [Key]
        public int FundingID { get; set; }

        [Required]
        public string FundingName { get; set; }

        public string? Provider { get; set; }

        public string? FundingType { get; set; }

        public string? Description { get; set; }

        public string? Eligibility { get; set; }

        public DateTime? Deadline { get; set; }

        public string? ApplicationURL { get; set; }

        // Navigation properties
        public ICollection<UniversityFunding>? UniversityFundings { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class Document
    {
        [Key]
        public int DocumentID { get; set; }

        [Required]
        public string DocumentName { get; set; }

        public string Description { get; set; }

        // Navigation property
        public ICollection<UserDocument> UserDocuments { get; set; }
    }
}

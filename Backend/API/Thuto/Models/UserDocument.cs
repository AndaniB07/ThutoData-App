using System.ComponentModel.DataAnnotations;

namespace Thuto.Models
{
    public class UserDocument
    {
        public int UserID { get; set; }

        public int DocumentID { get; set; }

        public bool IsCompleted { get; set; }

        public User User { get; set; }

        public Document Document { get; set; }
    }
}

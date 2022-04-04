using System.ComponentModel.DataAnnotations;

namespace giftMe.Models
{
    public class Gifts
    {
         public int Id { get; set; }

        [Required]
        public string ItemReceived { get; set; }

        [Required]

        public string Title { get; set; }

        public string Url { get; set; }
        public string Imagelocation { get; set; }
        public string Notes { get; set; }
        
        [Required]
        public int Quantity { get; set; }

        public int UserId { get; set; }

        public UserProfile UserProfile { get; set; }

        public int TyoesId { get; set; }

        public Types Types { get; set; }


    }
}

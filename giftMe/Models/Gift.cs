using System.ComponentModel.DataAnnotations;

namespace giftMe.Models
{
    public class Gift
    {
         public int Id { get; set; }

        [Required]
        public bool ItemReceived { get; set; }

        [Required]

        public string Title { get; set; }

        public string Url { get; set; }
        public string ImageLocation { get; set; }
        public string Notes { get; set; }
        
        [Required]
        public int Quantity { get; set; }

        public int UserId { get; set; }

        public UserProfile UserProfile { get; set; }

        public int TypesId { get; set; }

        public Type Types { get; set; }


    }
}

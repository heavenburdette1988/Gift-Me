using System;
using System.ComponentModel.DataAnnotations;

namespace giftMe.Models
{
    public class List
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }
        [Required]
        public DateTime CreateDateTime { get; set; }
        [Required]
        public int GiftId { get; set; } 

        public Gifts Gifts { get; set; }
        [Required]
        public int TypeId { get; set; }

        public Types Types { get; set; }
    }
}

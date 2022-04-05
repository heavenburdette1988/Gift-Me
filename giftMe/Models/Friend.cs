using System;
using System.ComponentModel.DataAnnotations;

namespace giftMe.Models
{
    public class Friend
    {
        public int Id { get; set; }
        [Required]
        public DateTime BeginDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}

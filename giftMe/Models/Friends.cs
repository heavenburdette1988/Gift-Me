using System;
using System.ComponentModel.DataAnnotations;

namespace giftMe.Models
{
    public class Friends
    {
        public int Id { get; set; }
        [Required]
        public DateTime BeginDateTime { get; set; }
        public DateTime EndDateTime { get; set; }
    }
}

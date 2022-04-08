using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace giftMe.Models
{
    public class Friend
    {
        public int Id { get; set; }
        [Required]
        public DateTime BeginDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public int SubscriberUserId { get; set; }
        public int ProfileUserId { get; set; }

        public UserProfile UserProfile { get; set; }

        public List<UserProfile> UserProfiles { get; set; } = new List<UserProfile>();
    }
}

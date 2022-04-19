using System;

namespace giftMe.Models
{
    public class Event
    {
        public int Id { get; set; }

        public string Title { get; set; }
        public string content { get; set; }
        public string ImageLocation { get; set; }
        public DateTime EventDate { get; set; }
        public DateTime PublishDateTime { get; set; }

        public int TypeId { get; set; }

        public Type Types { get; set; }

        public int UserId { get; set; }

        public UserProfile UserProfile { get; set; }


    }
}

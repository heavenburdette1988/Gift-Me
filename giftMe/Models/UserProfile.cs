using System;
using System.ComponentModel.DataAnnotations;

namespace giftMe.Models
{
    public class UserProfile
    {

        public int Id { get; set; }

        [Required] 
        public string DisplayName { get; set; }

        [Required] 
        public string FirstName { get; set; }

        [Required] 
        public string LastName { get; set; }
        [Required] 
        public string Email { get; set; }
        [Required] 
        public DateTime CreateDateTime { get; set; }

         
        public string ImageLocation { get; set; }
        public string About { get; set; }

        [Required] 
        public DateTime DateOfBirth { get; set; }



    }
}

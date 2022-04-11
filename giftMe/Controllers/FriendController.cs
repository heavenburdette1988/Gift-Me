using giftMe.Models;
using giftMe.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace giftMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController : ControllerBase
    {

        private readonly IFriendRepository _friendRepository;
        public FriendController(IFriendRepository friendRepository)
        {
            _friendRepository = friendRepository;
        }

        // GET: api/<FriendController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_friendRepository.GetAllFriends());
        }

        // GET api/<FriendController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<FriendController>
        [HttpPost]
        public void Post(Friend friend)
        {
            _friendRepository.AddFriend(friend);
        }


        // PUT api/<FriendController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }


        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _friendRepository.DeleteFriend(id);
            return NoContent();
        }
    }
}


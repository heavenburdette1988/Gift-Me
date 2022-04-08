using giftMe.Models;
using giftMe.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace giftMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly IUserRepository _userRepository;
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }


        // GET: api/<UserControllercs>

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);
            if (email == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

    



        // GET api/<UserControllercs>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<UserControllercs>
        //Post to user profile
        [HttpPost]
        public IActionResult Post(UserProfile user)
        {
            _userRepository.Add(user);
            return CreatedAtAction("GetByEmail", new { email = user.Email }, user);
        }

        // PUT api/<UserControllercs>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<UserControllercs>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

using giftMe.Models;
using giftMe.Repositories;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace giftMe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftController : ControllerBase
    {
   

            private readonly IGiftRepository _giftRepository;
            public GiftController(IGiftRepository giftRepository)
            {
                _giftRepository = giftRepository;
            }


            // GET: api/<GiftController>
            [HttpGet]
            public IActionResult Get()
            {
                return Ok(_giftRepository.GetAllGifts());
            }

            // GET api/<GiftController>/5
            [HttpGet("{id}")]
            public string Get(int id)
            {
                return "value";
            }

        // POST api/<GiftController>
        [HttpPost("addToGift")]
        public IActionResult Gift(Gift gift)
        {
            _giftRepository.AddGift(gift);
          //This is the controller that posts to gift by calling addGift Method
            return NoContent();
        }

        // PUT api/<GiftController>/5
        [HttpPut("{id}")]
            public void Put(int id, [FromBody] string value)
            {
            }

            // DELETE api/<GiftController>/5
            [HttpDelete("{id}")]
            public void Delete(int id)
            {
            }
        }
    }


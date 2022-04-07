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
        public IActionResult Get(int id)
        {
            var gift = _giftRepository.GetGiftById(id);
            if (gift == null)
            {
                return NotFound();
            }
            return Ok(gift);
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
        public IActionResult Put(int id,Gift gift)
        {
            if (id != gift.Id)
            {
                return BadRequest();
            }

            _giftRepository.UpdateGift(gift);
            return NoContent();
        }

        [HttpPatch("{id}")]
        public IActionResult Patch( int id, bool ItemReceived)
        {
            
          //map body of requests to a gift object - gift.itemRecieved
            _giftRepository.UpdateItemReceived(id, ItemReceived);
            return NoContent();
        }


        // DELETE api/<GiftController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _giftRepository.DeleteGift(id);
            return NoContent();
        }
    }
    }


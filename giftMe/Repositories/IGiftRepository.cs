using giftMe.Models;
using System.Collections.Generic;

namespace giftMe.Repositories
{
    public interface IGiftRepository
    {
        void AddGift(Gift gift);
        void DeleteGift(int id);
        List<Gift> GetAllGifts();
        Gift GetGiftById(int id);
        void UpdateGift(Gift gift);
         void UpdateItemReceived(int id, bool gift);
    }
}
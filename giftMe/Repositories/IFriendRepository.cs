using giftMe.Models;
using System.Collections.Generic;

namespace giftMe.Repositories
{
    public interface IFriendRepository
    {
        void AddFriend(Friend friend);
       
        List<Friend> GetAllFriends();
        Friend GetFriendById(int id);
        void UpdateFriendShip(int id, bool friendship);
    }
}
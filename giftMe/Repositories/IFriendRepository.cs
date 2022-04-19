using giftMe.Models;
using System;
using System.Collections.Generic;

namespace giftMe.Repositories
{
    public interface IFriendRepository
    {
        void AddFriend(Friend friend);
       
        List<Friend> GetAllFriends();
        //List<Friend> GetAllFriends(int id);

        Friend GetFriendById(int id);
        void DeleteFriend(int id);
    }
}
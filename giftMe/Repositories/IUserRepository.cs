﻿using giftMe.Models;
using System.Collections.Generic;

namespace giftMe.Repositories
{
    public interface IUserRepository
    {
        void Add(UserProfile user);
        List<UserProfile> GetAll();
        UserProfile GetByEmail(string email);
        UserProfile GetById(int id);
    }
}
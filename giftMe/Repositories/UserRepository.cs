using Microsoft.Extensions.Configuration;

namespace giftMe.Repositories
{
    public class UserRepository:BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }
    }
}

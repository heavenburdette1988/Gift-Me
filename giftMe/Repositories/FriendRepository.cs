using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using giftMe.Models;
using giftMe.Utils;
using System;
using System.Linq;

namespace giftMe.Repositories
{


    public class FriendRepository : BaseRepository, IFriendRepository
    {


        public FriendRepository(IConfiguration configuration) : base(configuration) { }



        // will use this for explore page

        public List<Friend> GetAllFriends()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
              SELECT f.Id AS FriendId, f.ProfileUserId as FriendUserProfileID, f.SubscriberUserId as UserFollowingFriendId, f.BeginDateTime as FriendFollowingDate,
                       up.Id as UserProfielId, up.DisplayName as UserDisplayName, up.About as UserAbout, up.Email as UserEmail, up.CreateDateTime AS UserProfileDateCreated, 
                       up.ImageLocation AS UserProfileImageUrl, up.FirstName as UserFirstName, up.LastName as UserLastName, up.DateOfBirth as UserDOB
                  FROM Friends f 
                        JOIN UserProfile up ON up.Id = f.ProfileUserId";
                       //where f.SubscriberUserId = @id;"; 

                    //DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var friends = new List<Friend>();



                    while (reader.Read())
                    {
                        var FriendId = DbUtils.GetInt(reader, "FriendId");

                        var existingFriend = friends.FirstOrDefault(f => f.Id == FriendId);
                        if (existingFriend == null)
                        {

                            existingFriend = new Friend()
                            {
                                Id = DbUtils.GetInt(reader, "FriendId"),
                                ProfileUserId = DbUtils.GetInt(reader, "FriendUserProfileID"),
                                SubscriberUserId = DbUtils.GetInt(reader, "UserFollowingFriendId"),
                                BeginDateTime = DbUtils.GetDateTime(reader, "FriendFollowingDate"),
                                
                            };
                            friends.Add(existingFriend);
                        }

                        


                        if (DbUtils.IsNotDbNull(reader, "UserProfielId"))
                        {
                            existingFriend.UserProfiles.Add(new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "UserProfielId"),
                                DisplayName = DbUtils.GetString(reader, "UserDisplayName"),
                                FirstName = DbUtils.GetString(reader, "UserFirstName"),
                                LastName = DbUtils.GetString(reader, "UserLastName"),
                                Email = DbUtils.GetString(reader, "UserEmail"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
                                About = DbUtils.GetString(reader, "UserAbout"),
                                DateOfBirth = DbUtils.GetDateTime(reader, "UserDOB"),


                                });

                            }

                        }
                        reader.Close();

                        return friends;
                    }
                }


            }

        public Friend GetFriendById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT g.Id AS GiftId, g.Title, g.ItemReceived as GiftItemReceived, g.title as GiftTitle, g.Url as GiftURl, 
                       g.ImageLocation AS GiftImageUrl, g.UserId as GiftUserId, g.Notes as giftNotes,g.Quantity as GiftQuantity, g.TypesId as GiftType,
                       up.DisplayName as UserDisplayName, up.About as UserAbout, up.Email as UserEmail, up.CreateDateTime AS UserProfileDateCreated, 
                       up.ImageLocation AS UserProfileImageUrl
                  FROM Gifts g 
                       LEFT JOIN UserProfile up ON g.UserId = up.id
                       WHERE g.Id = @Id;";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Friend friend = null;
                    if (reader.Read())
                    {
                        friend = new Friend()
                        {

                            Id = DbUtils.GetInt(reader, "FriendId"),
                            ProfileUserId = DbUtils.GetInt(reader, "FriendUserProfileID"),
                            SubscriberUserId = DbUtils.GetInt(reader, "UserFollowingFriendId"),
                            BeginDateTime = DbUtils.GetDateTime(reader, "FriendFollowingDate"),
                       

                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "GiftUserId"),
                                DisplayName = DbUtils.GetString(reader, "UserDisplayName"),
                                Email = DbUtils.GetString(reader, "UserEmail"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
                            },
                        };
                    }

                    reader.Close();

                    return friend;
                }
            }
        }


        public void AddFriend(Friend friend)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    
                       INSERT INTO Friends (ProfileUserId, SubscriberUserId, BeginDateTime)
                    OUTPUT INSERTED.ID
                    VALUES (@ProfileUserId, @SubscriberUserId,@BeginDateTime)";

                    DbUtils.AddParameter(cmd, "@ProfileUserId", friend.ProfileUserId);
                    DbUtils.AddParameter(cmd, "@SubscriberUserId", friend.SubscriberUserId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", DateTime.Now);
          


                    friend.Id = (int)cmd.ExecuteScalar();
                }
            }
        }


        public void DeleteFriend(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Friends WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@Id", id);
                    cmd.ExecuteNonQuery();
                }
            }


        }
        }
}


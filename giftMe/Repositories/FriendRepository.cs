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
              SELECT f.Id AS FriendId, f.ProfileUserId as FriendUserProfileID, f.SubscriberUserId as UserFollowingFriendId, f.BeginDateTime as FriendFollowingDate, f.EndDateTime as FriendEndDate,
                       up.Id as UserProfielId, up.DisplayName as UserDisplayName, up.About as UserAbout, up.Email as UserEmail, up.CreateDateTime AS UserProfileDateCreated, 
                       up.ImageLocation AS UserProfileImageUrl, up.FirstName as UserFirstName, up.LastName as UserLastName, up.DateOfBirth as UserDOB
                  FROM Friends f 
                       LEFT JOIN UserProfile up ON up.Id = f.ProfileUserId
                    ;";

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
                                EndDateTime = DbUtils.GetNullableDateTime(reader, "FriendEndDate"),
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
                            EndDateTime = DbUtils.GetNullableDateTime(reader, "FriendEndDate"),

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
                    
                       INSERT INTO Friends (ProfileUserId, SubscriberUserId, BeginDateTime, EndDateTime)
                    OUTPUT INSERTED.ID
                    VALUES (@ProfileUserId, @SubscriberUserId,@BeginDateTime, @EndDateTime)";

                    DbUtils.AddParameter(cmd, "@ProfileUserId", friend.ProfileUserId);
                    DbUtils.AddParameter(cmd, "@SubscriberUserId", friend.SubscriberUserId);
                    DbUtils.AddParameter(cmd, "@BeginDateTime", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@EndDateTime", null);


                    friend.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



        public void UpdateFriendShip(int id, DateTime EndDateTime)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Friends
                       SET
                           EndDateTime = @EndDateTime
                            WHERE Id = @Id";


                    DbUtils.AddParameter(cmd, "@EndDateTime", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }



        //public List<Post> Search(string criterion, bool sortDescending)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            var sql =
        //                @"SELECT p.Id AS PostId, p.Title, p.Caption, p.DateCreated AS PostDateCreated, 
        //                p.ImageUrl AS PostImageUrl, p.UserProfileId,
        //                up.Name, up.Bio, up.Email, up.DateCreated AS UserProfileDateCreated, 
        //                up.ImageUrl AS UserProfileImageUrl
        //            FROM Post p 
        //                LEFT JOIN UserProfile up ON p.UserProfileId = up.id
        //            WHERE p.Title LIKE @Criterion OR p.Caption LIKE @Criterion";

        //            if (sortDescending)
        //            {
        //                sql += " ORDER BY p.DateCreated DESC";
        //            }
        //            else
        //            {
        //                sql += " ORDER BY p.DateCreated";
        //            }

        //            cmd.CommandText = sql;
        //            DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
        //            //wild card $"%{}%
        //            var reader = cmd.ExecuteReader();

        //            var posts = new List<Post>();
        //            while (reader.Read())
        //            {
        //                posts.Add(new Post()
        //                {
        //                    Id = DbUtils.GetInt(reader, "PostId"),
        //                    Title = DbUtils.GetString(reader, "Title"),
        //                    Caption = DbUtils.GetString(reader, "Caption"),
        //                    DateCreated = DbUtils.GetDateTime(reader, "PostDateCreated"),
        //                    ImageUrl = DbUtils.GetString(reader, "PostImageUrl"),
        //                    UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
        //                    UserProfile = new UserProfile()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "UserProfileId"),
        //                        Name = DbUtils.GetString(reader, "Name"),
        //                        Email = DbUtils.GetString(reader, "Email"),
        //                        DateCreated = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
        //                        ImageUrl = DbUtils.GetString(reader, "UserProfileImageUrl"),
        //                    },
        //                });
        //            }

        //            reader.Close();

        //            return posts;
        //        }
        //    }
        //}
    }
}


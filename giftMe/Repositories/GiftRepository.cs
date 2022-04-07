
using giftMe.Models;
using giftMe.Utils;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;


namespace giftMe.Repositories
{
    public class GiftRepository : BaseRepository, IGiftRepository
    {
        public GiftRepository(IConfiguration configuration) : base(configuration) { }


        public List<Gift> GetAllGifts()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
               SELECT g.Id AS GiftId, g.Title, g.ItemReceived as GiftItemReceived, g.title as GiftTitle, 
                       g.ImageLocation AS GiftImageUrl, g.Quantity as GiftQuantity, g.TypesId as GiftType, g.URL as GiftURL, g.UserId as GiftUserId, g.Notes as giftNotes,
                       up.DisplayName as UserDisplayName, up.About as UserAbout, up.Email as UserEmail, up.CreateDateTime AS UserProfileDateCreated, 
                       up.ImageLocation AS UserProfileImageUrl
                  FROM Gifts g 
                       LEFT JOIN UserProfile up ON up.Id = g.UserId
                       Where up.Id = g.userId and ItemReceived = 0;";

                    var reader = cmd.ExecuteReader();

                    var gifts = new List<Gift>();
                    while (reader.Read())
                    {
                        gifts.Add(new Gift()
                        {
                            Id = DbUtils.GetInt(reader, "GiftId"),
                            Title = DbUtils.GetString(reader, "GiftTitle"),
                            Notes = DbUtils.GetString(reader, "giftNotes"),
                            Url = DbUtils.GetString(reader, "GiftURL"),
                            ImageLocation = DbUtils.GetString(reader, "GiftImageUrl"),
                            UserId = DbUtils.GetInt(reader, "GiftUserId"),
                            ItemReceived = reader.GetBoolean(reader.GetOrdinal( "GiftItemReceived")),
                            Quantity = DbUtils.GetInt(reader, "GiftQuantity"),
                            TypesId = DbUtils.GetInt(reader, "GiftType"),
                            UserProfile = new UserProfile()
                            {
                                Id = DbUtils.GetInt(reader, "GiftUserId"),
                                DisplayName = DbUtils.GetString(reader, "UserDisplayName"),
                                Email = DbUtils.GetString(reader, "UserEmail"),
                                CreateDateTime = DbUtils.GetDateTime(reader, "UserProfileDateCreated"),
                                ImageLocation = DbUtils.GetString(reader, "UserProfileImageUrl"),
                            },
                        });
                    }

                    reader.Close();

                    return gifts;
                }
            }
        }

        public Gift GetGiftById(int id)
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

                    Gift gift = null;
                    if (reader.Read())
                    {
                        gift = new Gift()
                        {
                            Id = DbUtils.GetInt(reader, "GiftId"),
                            Title = DbUtils.GetString(reader, "GiftTitle"),
                            Notes = DbUtils.GetString(reader, "giftNotes"),
                            TypesId = DbUtils.GetInt(reader, "GiftType"),
                            ItemReceived = reader.GetBoolean(reader.GetOrdinal("GiftItemReceived")),
                            Quantity = DbUtils.GetInt(reader, "GiftQuantity"),
                            Url = DbUtils.GetString(reader, "GiftURL"),
                            ImageLocation = DbUtils.GetString(reader, "GiftImageUrl"),

                            UserId = DbUtils.GetInt(reader, "GiftUserId"),
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

                    return gift;
                }
            }
        }

        public void AddGift(Gift gift)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Gifts (Title, ItemReceived, Url, ImageLocation, UserId, Quantity,TypesId, Notes)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @ItemReceived, @Url, @ImageLocation, @UserId, @Quantity, @TypesId, @Notes)";

                    DbUtils.AddParameter(cmd, "@Title", gift.Title);
                    DbUtils.AddParameter(cmd, "@ItemReceived", false);
                    DbUtils.AddParameter(cmd, "@Url", gift.Url);
                    DbUtils.AddParameter(cmd, "@ImageLocation", gift.ImageLocation);
                    DbUtils.AddParameter(cmd, "@UserId", gift.UserId);
                    DbUtils.AddParameter(cmd, "@Quantity", gift.Quantity);
                    DbUtils.AddParameter(cmd, "@TypesId", 1);
                    DbUtils.AddParameter(cmd, "@Notes", gift.Notes);

                    gift.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void UpdateGift(Gift gift)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Gifts
                           SET Title = @Title,
                               ItemReceived = @ItemReceived,
                               Url = @Url,
                               ImageLocation = @ImageLocation,
                               UserId = @UserId,
                               Quantity = @Quantity,
                               TypesId = @TypesId,
                               Notes = @Notes

                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", gift.Title);
                    DbUtils.AddParameter(cmd, "@ItemReceived", gift.ItemReceived);
                    DbUtils.AddParameter(cmd, "@Url", gift.Url);
                    DbUtils.AddParameter(cmd, "@ImageLocation", gift.ImageLocation);
                    DbUtils.AddParameter(cmd, "@UserId", gift.UserId);
                    DbUtils.AddParameter(cmd, "@Quantity", gift.Quantity);
                    DbUtils.AddParameter(cmd, "@TypesId", gift.TypesId);
                    DbUtils.AddParameter(cmd, "@Notes", gift.Notes);
                    DbUtils.AddParameter(cmd, "@Id", gift.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }


        public void UpdateItemReceived(int id, bool itemReceived)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Gifts
                           SET
                               ItemReceived = @ItemReceived
                                WHERE Id = @Id";

                   
                    DbUtils.AddParameter(cmd, "@ItemReceived", itemReceived);
                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteGift(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Gifts WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
using giftMe.Models;
using giftMe.Utils;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;

namespace giftMe.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }


        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT up.Id as UserId, up.DisplayName as displayName, up.FirstName as firstName, up.LastName as LastName, up.Email as Email, up.ImageLocation as imageLocation, up.About as About, up.CreateDateTime as createDate, up.DateOfBirth as DOB, f.id as friendId, f.subscriberUserId as subscriberUserId, f.ProfileUserId as  ProfileUserId
                          FROM UserProfile up
                          Left join Friends f on f.ProfileUserID = up.Id
                        
                          ORDER BY CreateDateTime;";

                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "UserId"),
                            DisplayName = DbUtils.GetString(reader, "displayName"),
                            FirstName = DbUtils.GetString(reader, "firstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "createDate"),
                            DateOfBirth = DbUtils.GetDateTime(reader, "DOB"),
                            ImageLocation = DbUtils.GetString(reader, "imageLocation"),
                            About = DbUtils.GetString(reader, "About"),
                           
                        });
                    }

                            reader.Close();

                    return users;
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        Select Id, DisplayName, FirstName, LastName, Email, ImageLocation, About, CreateDateTime, DateOfBirth
                          FROM UserProfile 
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    UserProfile user = null;
                    if (reader.Read())
                    {
                        user = new UserProfile()
                        {

                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            DateOfBirth = DbUtils.GetDateTime(reader, "DateOfBirth"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            About = DbUtils.GetString(reader, "About")
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public void Add(UserProfile user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (FirstName, LastName,DisplayName, Email, CreateDateTime, ImageLocation, About, DateOfBirth)
                        OUTPUT INSERTED.ID
                        VALUES (@FirstName, @LastName,@DisplayName, @Email, @CreateDateTime, @ImageLocation, @About ,@DateOfBirth)";

                    DbUtils.AddParameter(cmd, "@FirstName", user.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", user.LastName);
                    DbUtils.AddParameter(cmd, "@DisplayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@DateOfBirth", user.DateOfBirth);
                    DbUtils.AddParameter(cmd, "@ImageLocation", user.ImageLocation);
                    DbUtils.AddParameter(cmd, "@About", user.About);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void DeleteUser(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM UserProfile WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public UserProfile GetByEmail(string email)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DisplayName, FirstName, LastName, Email, ImageLocation, About, CreateDateTime, DateOfBirth FROM UserProfile WHERE Email = @Email";
                    cmd.Parameters.AddWithValue("@Email", email);



                    var reader = cmd.ExecuteReader();

                    UserProfile user = null;
                    if (reader.Read())
                    {
                        user = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            DateOfBirth = DbUtils.GetDateTime(reader, "DateOfBirth"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            About = DbUtils.GetString(reader, "About")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }

        }

        public void UpdateUser(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       UPDATE UserProfile
                           SET DisplayName = @DisplayName,
                               FirstName = @FirstName,
                               LastName = @LastName,
                               ImageLocation = @ImageLocation,
                               Email = @Email,
                               CreateDateTime = @CreateDateTime,
                               About = @About,
                               DateOfBirth = @DateOfBirth

                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName",userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@ImageLocation", userProfile.ImageLocation);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateDateTime", userProfile.CreateDateTime);
                    DbUtils.AddParameter(cmd, "@About", userProfile.About);
                    DbUtils.AddParameter(cmd, "@DateOfBirth", userProfile.DateOfBirth);
                    DbUtils.AddParameter(cmd, "@Id", userProfile.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<UserProfile> SearchUser(string criterion, bool sortDescending)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql =
                        @" SELECT up.Id as UserId, up.DisplayName as displayName, up.FirstName as firstName, up.LastName as LastName, up.Email as Email, up.ImageLocation as imageLocation, up.About as About, up.CreateDateTime as createDate, up.DateOfBirth as DOB, f.id as friendId, f.subscriberUserId as subscriberUserId, f.ProfileUserId as  ProfileUserId
                          FROM UserProfile up
                          Left join Friends f on f.ProfileUserID = up.Id
                        WHERE up.DisplayName LIKE @Criterion OR up.FirstName LIKE @Criterion OR up.LastName LIKE @Criterion ";

                    if (sortDescending)
                    {
                        sql += " ORDER BY up.CreateDateTime DESC";
                    }
                    else
                    {
                        sql += " ORDER BY up.CreateDateTime";
                    }

                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    //wild card $"%{}%
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        { 
                        Id = DbUtils.GetInt(reader, "UserId"),
                            DisplayName = DbUtils.GetString(reader, "displayName"),
                            FirstName = DbUtils.GetString(reader, "firstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "createDate"),
                            DateOfBirth = DbUtils.GetDateTime(reader, "DOB"),
                            ImageLocation = DbUtils.GetString(reader, "imageLocation"),
                            About = DbUtils.GetString(reader, "About")
                       
                           
                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }

        public List<UserProfile> GetAllByDOB()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                   SELECT id, dateofbirth,DisplayName, FirstName, LastName, Email,CreateDateTime,DateOfBirth, ImageLocation,About
                   ,FLOOR(DATEDIFF(dd, dateofbirth,GETDATE()) / 365.25) AS AGE_NOW
                   ,FLOOR(DATEDIFF(dd,dateofbirth,GETDATE()+30) / 365.25) AS AGE_30_Days_FROM_NOW
                   FROM userProfile
                         
                    WHERE 1 = (FLOOR(DATEDIFF(dd,dateofbirth,GETDATE()+30) / 365.25))
                        -
                    (FLOOR(DATEDIFF(dd,dateofbirth,GETDATE()) / 365.25));";

                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                            DateOfBirth = DbUtils.GetDateTime(reader, "DateOfBirth"),
                            ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                            About = DbUtils.GetString(reader, "About"),
                         

                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }
    }
}


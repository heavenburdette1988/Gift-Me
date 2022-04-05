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
                        SELECT Id, DisplayName, FirstName, LastName, Email, ImageLocation, About, CreateDateTime, DateOfBirth
                          FROM UserProfile  
                      ORDER BY CreateDateTime;";

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
                            About = DbUtils.GetString(reader, "About")
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
    }
}


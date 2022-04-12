using giftMe.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

namespace giftMe.Repositories
{

        public class EventRepository : BaseRepository
        {
            public EventRepository(IConfiguration configuration) : base(configuration) { }
        //this will be used for events component

            public List<Event> GetAll()
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                      ;";

                        var reader = cmd.ExecuteReader();

                        var events = new List<Event>();
                        while (reader.Read())
                        {
                            events.Add(new Event()
                            {
                               
                            });
                        }

                        reader.Close();

                        return events;
                    }
                }
            }
        }
}

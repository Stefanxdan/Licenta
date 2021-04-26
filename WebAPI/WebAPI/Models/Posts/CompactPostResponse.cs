using System;

namespace WebAPI.Models.Posts
{
    public class CompactPostResponse
    {
        public Guid Id { get; set; }
        public string Title { get; set; }

        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int MapRadius { get; set; }
    }
}
using System;

namespace WebAPICrawler.Models
{
    public class Post
    {
        public Guid IdUser { get; set; }
        public bool IsLocal { get; set; }
        public bool ForRent { get; set; }

        public string Title { get; set; }
        public int Price { get; set; }
        public string Currency { get; set; }
        public string CityLabel { get; set; }

        public float Latitude { get; set; }
        public float Longitude { get; set; }

        public int SurfaceBuilt { get; set; }
        public int SurfaceUseful { get; set; }

        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }

        public string Type { get; set; }
        public string Condition { get; set; }
        public string Partitioning { get; set; }
    }
}
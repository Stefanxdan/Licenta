using Microsoft.AspNetCore.Http;

namespace WebAPI.Models.Posts
{
    public class CreatePostModel
    {
        public bool ForRent { get; set; }
        
        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string Currency { get; set; }
        public string CityLabel { get; set; }
        
        public int PhotosNumber { get; set; }
        
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int MapRadius { get; set; }
        
        public int BuildingYear { get; set; }
        
        public int FloorPosition { get; set; }
        public int FloorsBuilding { get; set; }

        public int SurfaceBuilt { get; set; }
        public int SurfaceUseful { get; set; }

        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }

        public string Type { get; set; }
        public string Condition { get; set; }
        public string Partitioning { get; set; }
    }
}
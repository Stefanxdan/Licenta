using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace WebAPI.Entities
{
    public class Post : BaseEntity
    {
        [Column("Id_user")]
        public Guid IdUser { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        public bool IsLocal { get; set; }
        public bool ForRent { get; set; }
        
        public string ExternalUrl { get; set; }

        public string Title { get; set; }
        public string Description { get; set; }
        public int Price { get; set; }
        public string Currency { get; set; }
        public string PhotosPaths { get; set; }

        [Column("City_label")]
        public string CityLabel { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int MapRadius { get; set; }
        
        public int BuildingYear { get; set; }
        
        public int FloorPosition { get; set; }
        public int FloorsBuilding { get; set; }

        [Column("Surface_built")]
        public int SurfaceBuilt { get; set; }
        [Column("Surface_useful")]
        public int SurfaceUseful { get; set; }
        
        public int Bedrooms { get; set; }
        public int Bathrooms { get; set; }
        
        [Comment("Apartment / House")]
        public string Type { get; set; }
        public string Condition { get; set; }
        public string Partitioning { get; set; }

    }
}

using System;
using System.Linq;
using Microsoft.AspNetCore.Http;

namespace WebAPI.Models.Queries
{
    public class PostsFilters
    {

        public void Display()
        {
            Console.WriteLine("Filters: " + Filters);
            Console.WriteLine("IdUser: " + IdUser);
            Console.WriteLine("IsLocal: " + IsLocal);
            Console.WriteLine("ForRent: " + ForRent);
            Console.WriteLine("Bathrooms: " + Bathrooms);
            Console.WriteLine("Bedrooms: " +Bedrooms);
            Console.WriteLine("PriceMin: "+PriceMin);
            Console.WriteLine("PriceMax: "+PriceMax);
            Console.WriteLine("CityLabel: "+CityLabel);
            Console.WriteLine("Type: "+Type);
            Console.WriteLine("Partitioning: "+Partitioning);
        }

        public PostsFilters()
        {
        }
        
        public PostsFilters(IQueryCollection query)
        {
            var stringBool = query["Filters"].ToString() ;
            Filters = !string.IsNullOrEmpty(stringBool) && bool.Parse(stringBool); 
            
            stringBool = query["IsLocal"].ToString() ;
            IsLocal = !string.IsNullOrEmpty(stringBool) ? bool.Parse(stringBool) : null;

            stringBool = query["IdUser"].ToString();
            IdUser = !string.IsNullOrEmpty(stringBool) ? Guid.Parse(stringBool) :null ;
            
            stringBool = query["ForRent"].ToString() ;
            ForRent = !string.IsNullOrEmpty(stringBool) ? bool.Parse(stringBool) : null; 
            
            
            CityLabel = query["CityLabel"].ToString();
            Type = query["Type"].ToString();
            Partitioning = query["Partitioning"].ToString();

            var stringNumber = query["PriceMin"].ToString();
            PriceMin = !string.IsNullOrEmpty(stringNumber) ? int.Parse(stringNumber) : null;

            stringNumber = query["PriceMax"].ToString();
            PriceMax = !string.IsNullOrEmpty(stringNumber) ? int.Parse(stringNumber) : null;

            stringNumber = query["Bedrooms"].ToString();
            Bedrooms = !string.IsNullOrEmpty(stringNumber) ? int.Parse(stringNumber) : null;

            stringNumber = query["Bathrooms"].ToString();
            Bathrooms = !string.IsNullOrEmpty(stringNumber) ? int.Parse(stringNumber) : null;
            
        }
        
        public PostsFilters(bool filters, bool isLocal, bool forRent, int priceMin, int priceMax, string cityLabel, int bedrooms, int bathrooms, string type, string partitioning, Guid idUser)
        {
            Console.WriteLine("Second Constructor");
            Filters = filters;
            IsLocal = isLocal;
            ForRent = forRent;
            PriceMin = priceMin;
            PriceMax = priceMax;
            CityLabel = cityLabel;
            Bedrooms = bedrooms;
            Bathrooms = bathrooms;
            Type = type;
            Partitioning = partitioning;
            IdUser = idUser;
        }
            
        public Guid? IdUser { get; set; }
        public bool Filters { get; set; }
        public bool? IsLocal { get; set; } 
        public bool? ForRent { get; set; }
        public int? PriceMin { get; set; }
        public int? PriceMax { get; set; }
        public string CityLabel { get; set; }
        public int? Bedrooms { get; set; }
        public int? Bathrooms { get; set; }
        public string Type { get; set; }
        public string Partitioning { get; set; }
    }
}
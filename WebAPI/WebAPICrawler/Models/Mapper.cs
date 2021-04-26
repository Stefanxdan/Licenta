using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace WebAPICrawler.Models
{
    public static class Mapper
    {
        public static IList<Post> CustomMap(Ad[] responseObjAds)
        {
            IList<Post> posts = new List<Post>();

            foreach (var ad in responseObjAds)
            {
                //string json = JsonConvert.SerializeObject(ad, Formatting.Indented);
                //Console.WriteLine(json);
                var post = new Post();
                try
                {

                    post.TimeAdded = DateTime.Now.AddDays(-ad.age);
                    post.IdUser = new Guid("c73472ee-ca57-46a9-49dd-08d901192cf6");
                    post.IsLocal = false;
                    post.ForRent = (ad.category_id % 2 == 0);

                    post.ExternalUrl = ad.url;
                    post.Title = ad.title;
                    post.Description = ad.description;

                    post.Price = Convert.ToInt32(ad.list_label.Split(" ")[0]);
                    post.Currency = "EUR";

                    post.CityLabel = ad.city_label;
                    post.Latitude = (float) Convert.ToDouble(ad.map_lat);
                    post.Longitude = (float) Convert.ToDouble(ad.map_lon);
                    post.MapRadius = ad.map_radius;

                    var valueString =
                        ad.listing_params?.FirstOrDefault(e => e.key == "Suprafata construita (m²)")?.value
                            .Split(" ")[0];
                    post.SurfaceBuilt = Convert.ToInt32(valueString);

                    valueString = ad._params?.FirstOrDefault(e => e[0] == "Suprafata utila (m²)")?[1].Split(" ")[0];
                    post.SurfaceUseful = Convert.ToInt32(valueString);

                    valueString =
                        ad.listing_params?.FirstOrDefault(e => e.key == "Numarul de camere")?.value.Split(" ")[0];
                    ;
                    post.Bedrooms = Convert.ToInt32(valueString);


                    valueString = ad._params?.FirstOrDefault(e => e[0] == "Numarul de bai")?[1].Split(" ")[0];
                    post.Bathrooms = Convert.ToInt32(valueString);

                    valueString = ad._params?.FirstOrDefault(e => e[0] == "Etaj")?[1].Split(" ")[0];
                    post.FloorPosition = Convert.ToInt32(valueString);

                    valueString = ad._params?.FirstOrDefault(e => e[0] == "Numarul total de etaje")?[1].Split(" ")[0];
                    post.FloorsBuilding = Convert.ToInt32(valueString);

                    valueString = ad._params?.FirstOrDefault(e => e[0] == "Anul constructiei")?[1].Replace(" ", "");
                    post.BuildingYear = Convert.ToInt32(valueString);


                    post.Type = (ad.category_id / 100 == 1) ? "apartament" : "house";

                    post.Condition = ad._params?.FirstOrDefault(e => e[0] == "Stare")?[1];
                    post.Partitioning = ad._params?.FirstOrDefault(e => e[0] == "Compartimentare")?[1];
                    foreach (var photo in ad.photos)
                    {
                        if (post.PhotosPaths != null)
                            post.PhotosPaths += "<>";
                        post.PhotosPaths += photo._3;
                    }

                    posts.Add(post);
                }
                catch
                {
                    Console.WriteLine(ad.id);
                }
            }

            return posts;
        }
    }
}
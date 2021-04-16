using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebAPICrawler.Models;

namespace WebAPICrawler
{
    class Program
    {
        static HttpClient client = new HttpClient();
        
        static async Task<IList<Post>> GetPostsAsync(string path)
        {
            HttpResponseMessage response = await client.GetAsync(path);

            if (response.IsSuccessStatusCode)
            {
                var result  = await response.Content.ReadAsStringAsync();
                result = result.Replace("\"params\":", "\"_params\":");
                result = result.Replace("\"0\":", "\"_0\":");
                result = result.Replace("\"1\":", "\"_1\":");
                result = result.Replace("\"2\":", "\"_2\":");
                result = result.Replace("\"3\":", "\"_3\":");
                var responseObj = JsonConvert.DeserializeObject<Rootobject>(result);
                //Console.WriteLine(result);
                //var responseObj = await response.Content.ReadAsAsync<Rootobject>();
                if (responseObj != null) 
                    return CustomMap(responseObj.ads);
            }
            
            return null;
        }

        private static IList<Post> CustomMap(Ad[] responseObjAds)
        {
            IList<Post> posts = new List<Post>();

            foreach (var ad in responseObjAds)
            {
                string json = JsonConvert.SerializeObject(ad, Formatting.Indented);
                Console.WriteLine(json);
                var post = new Post();
                post.IdUser = new Guid("c73472ee-ca57-46a9-49dd-08d901192cf6");
                post.IsLocal = false;
                post.ForRent = true;
                
                post.Title = ad.title;
                
                post.Price = Convert.ToInt32(ad.list_label.Split(" ")[0]);
                post.Currency = "EUR";
                
                post.CityLabel = ad.city_label;
                post.Latitude = (float) Convert.ToDouble(ad.map_lat);
                post.Longitude = (float) Convert.ToDouble(ad.map_lon);

                var valueString =
                    ad.listing_params?.First(e => e.key == "Suprafata construita (m²)").value.Split(" ")[0];
                post.SurfaceBuilt = Convert.ToInt32(valueString);
                
                valueString = ad._params?.First(e => e[0] == "Suprafata utila (m²)")[1].Split(" ")[0];
                post.SurfaceUseful = Convert.ToInt32(valueString);

                valueString = ad.listing_params?.First(e => e.key == "Numarul de camere").value.Split(" ")[0];;
                post.Bedrooms =  Convert.ToInt32(valueString);
                
                valueString = ad._params?.First(e => e[0] == "Numarul de bai")[1].Split(" ")[0];
                post.Bathrooms = Convert.ToInt32(valueString);

                post.Type = ad._params?.First(e => e[0] == "Tip proprietate")[1];
                post.Condition = ad._params?.First(e => e[0] == "Stare")[1];
                post.Partitioning = ad._params?.First(e => e[0] == "Compartimentare")[1];
                
                posts.Add(post);
            }

            return posts;
        }

        static void Main(string[] args)
        {
            RunAsync().GetAwaiter().GetResult();
        }
        

        static async Task RunAsync()
        {
            // Update port # in the following line.
            client.BaseAddress = new Uri("https://www.storia.ro/i2/ads/results/?json=1&search%5Border%5D=filter_float_m%3Adesc&search%5Blocation_id%5D=.39939&search%5Bcity_id%5D=39939&limit=5&search%5Bcategory_id%5D=102");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));

            try
            {
                // Get the posts
                var posts = await GetPostsAsync("");
                foreach (var post in posts)
                {
                    string json = JsonConvert.SerializeObject(post, Formatting.Indented);
                    //Console.WriteLine(json);
                }
                
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
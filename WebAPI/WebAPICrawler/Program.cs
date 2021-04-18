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
                    return Mapper.CustomMap(responseObj.ads);
            }
            
            return null;
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
                Console.WriteLine("[");
                foreach (var post in posts)
                {
                    string json = JsonConvert.SerializeObject(post, Formatting.Indented);
                    Console.WriteLine(json);
                    Console.WriteLine(",");
                }
                Console.WriteLine("]");
                
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
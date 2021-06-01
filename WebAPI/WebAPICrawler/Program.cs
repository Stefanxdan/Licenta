using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using WebAPICrawler.Models;

namespace WebAPICrawler
{
    class Program
    {
        static HttpClient storiaClient = new HttpClient();
        static HttpClient myApiClient = new HttpClient();
        
        static async Task<IList<Post>> GetPostsAsync(string path)
        {
            HttpResponseMessage response = await storiaClient.GetAsync(path);

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
                Console.WriteLine("Number of posts receive: " + responseObj?.ads.Length);
                if (responseObj != null)
                {
                    return Mapper.CustomMap(responseObj.ads);
                }
            }
            
            return null;
        }

        static async Task PostPostsAsync(IList<Post> posts)
        {
            var content = new StringContent(JsonConvert.SerializeObject(new AddMultiplePostsModel(posts)), Encoding.UTF8, "application/json");
            Console.WriteLine(content);
            HttpResponseMessage response = await myApiClient.PostAsync("http://localhost:5000/api/Posts/AddMultiple",content );
            Console.WriteLine(response.StatusCode);
            
        }




        static void Main(string[] args)
        {
            RunAsync().GetAwaiter().GetResult();
        }
        

        static async Task RunAsync()
        {
            // Update port # in the following line.
            storiaClient.BaseAddress = new Uri("https://www.storia.ro/i2/ads/results/?json=1&search%5Border%5D=filter_float_m%3Adesc&search%5Blocation_id%5D=.39939&search%5Bcity_id%5D=39939&limit=2500&search%5Bcategory_id%5D=102");
            storiaClient.DefaultRequestHeaders.Accept.Clear();
            storiaClient.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
            
            //
            myApiClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Ijg0NzY3ZTU1LWIxNWItNDA1OC0yYmRjLTA4ZDhmNWRjYjlkMSIsInJvbGUiOiJBZG1pbiIsIm5iZiI6MTYyMjQ3MDUxMywiZXhwIjoxNjIzMDc1MzEzLCJpYXQiOjE2MjI0NzA1MTN9.s8IsSTuxpqiTf7kqfgVIIyhlUYXbscMcjPALCi1nR3w");
            

            try
            {
                // Get the posts
                var posts = await GetPostsAsync("");
                Console.WriteLine("Number of posts mapped: " + posts.Count);
                /*
                Console.WriteLine("[");
                foreach (var post in posts)
                {
                    string json = JsonConvert.SerializeObject(post, Formatting.Indented);
                    Console.WriteLine(json);
                    Console.WriteLine(",");
                }
                Console.WriteLine("]");
                */
                
                // Post the posts
                await PostPostsAsync(posts);

            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
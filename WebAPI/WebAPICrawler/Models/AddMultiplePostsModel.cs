using System.Collections.Generic;

namespace WebAPICrawler.Models
{
    public class AddMultiplePostsModel
    {
        public AddMultiplePostsModel(IList<Post> _posts)
        {
            Posts = _posts;
        }
        

        public IList<Post> Posts { get; set; }
    }
}
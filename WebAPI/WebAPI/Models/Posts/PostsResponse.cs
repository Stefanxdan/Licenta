using System.Collections.Generic;
using System.Linq;
using WebAPI.Entities;
using WebAPI.Models.Queries;

namespace WebAPI.Models.Posts
{
    public class PostsResponse
    {
        public PostsResponse (){}

        public PostsResponse(IEnumerable<Post> posts, string currentUri, PaginationQuery pq = null)
        {
            Posts = posts;

            if (pq == null)
                return;
            if (pq.PageNumber < 1 || pq.PageSize < 1)
            {
                PageNumber = 1;
                PageSize = 50;
                return;
            }
            else
            {
                PageNumber = pq.PageNumber;
                PageSize = pq.PageSize;
            }

            if(Posts.Count() == PageSize)
                NextPage = currentUri.Replace("PageNumber=" + PageNumber, "PageNumber=" + (PageNumber + 1))
                    .Replace("PageSize=" + PageSize, "PageSize=" + (PageSize));
            
            if( pq.PageNumber > 1)
                PreviousPage = currentUri.Replace("PageNumber=" + PageNumber, "PageNumber=" + (PageNumber - 1))
                    .Replace("PageSize=" + PageSize, "PageSize=" + (PageSize));
        }
        
        public IEnumerable<Post> Posts { get; set; }

        public int? PageNumber { get; set; }
        
        public int? PageSize { get; set; }
        
        public string NextPage { get; set; }
        
        public string PreviousPage { get; set; }
    }
}
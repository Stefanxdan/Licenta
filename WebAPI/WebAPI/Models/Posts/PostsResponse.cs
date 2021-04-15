using System;
using System.Collections.Generic;
using System.Linq;
using WebAPI.Entities;
using WebAPI.Models.Queries;

namespace WebAPI.Models.Posts
{
    public class PostsResponse
    {
        public PostsResponse (){}

        public PostsResponse(int totalPostsNumber, IEnumerable<Post> posts, string currentUri,
            PaginationQuery pq = null)
        {
            TotalPostsNumber = totalPostsNumber;
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

            
            if (Posts.Count() + (PageNumber - 1) * PageSize < TotalPostsNumber)
                NextPage = currentUri.Replace("PageNumber=" + PageNumber, "PageNumber=" + (PageNumber + 1));

            if (pq.PageNumber > 1)
            {
                if (Posts.Count() == 0)
                {
                    var maxPageNUmber = Math.Ceiling((double)(TotalPostsNumber * 1.0 / PageSize));
                    PreviousPage = currentUri.Replace("PageNumber=" + PageNumber,
                        "PageNumber=" + maxPageNUmber);
                }
                else
                    PreviousPage = currentUri.Replace("PageNumber=" + PageNumber, "PageNumber=" + (PageNumber - 1));
            }
        }

        public int TotalPostsNumber { get; set; }
        public IEnumerable<Post> Posts { get; set; }

        public int? PageNumber { get; set; }
        
        public int? PageSize { get; set; }
        
        public string NextPage { get; set; }
        
        public string PreviousPage { get; set; }
    }
}
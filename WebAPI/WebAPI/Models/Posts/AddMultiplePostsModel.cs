using System;
using System.Collections.Generic;
using WebAPI.Entities;

namespace WebAPI.Models.Posts
{
    public class AddMultiplePostsModel
    {
        public IEnumerable<Post> Posts { get; set; }
    }
}
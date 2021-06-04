using System;

namespace WebAPI.Entities
{
    public class FavoritePost
    {
        public FavoritePost(Guid userId, Guid postId)
        {
            UserId = userId;
            PostId = postId;
        }

        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
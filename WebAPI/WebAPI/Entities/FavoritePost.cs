using System;

namespace WebAPI.Entities
{
    public class FavoritePost
    {
        public Guid UserId { get; set; }
        public Guid PostId { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{
    public interface IFavoritePostRepository
    {
        Task<IEnumerable<Post>> GetFavPostsByUserId(Guid userId);
    }
    
    public class FavoritePostRepository : IFavoritePostRepository
    {
        private readonly DataContext _dataContext;

        public FavoritePostRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IEnumerable<Post>> GetFavPostsByUserId(Guid userId)
        {
            var favPostIds = await _dataContext.FavoritePosts.Where(fv => fv.UserId == userId).Select(fv => fv.PostId).ToListAsync();
            var favPosts = _dataContext.Posts.Join(_dataContext.FavoritePosts,
                post => post.Id,
                favPost => favPost.PostId,
                ((post, favoritePost) => new {favoritePost, post})).Where(e => e.favoritePost.UserId == userId).Select(s => s.post);
            return favPosts.AsEnumerable();
        }
    }
}
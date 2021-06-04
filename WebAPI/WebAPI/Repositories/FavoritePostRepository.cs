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
        IQueryable<FavoritePost> GetFavPostsDataByUserId(Guid userId);
        Task<FavoritePost>  Add(FavoritePost entity);
        Task<bool> Remove(Guid userId, Guid postId);
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

        public IQueryable<FavoritePost> GetFavPostsDataByUserId(Guid userId)
        {
            var favPosts =  _dataContext.FavoritePosts.Where(fv => fv.UserId == userId).AsQueryable();
            return favPosts;
        }

        public async Task<FavoritePost> Add(FavoritePost entity)
        {
            await _dataContext.FavoritePosts.AddAsync(entity);
            await _dataContext.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> Remove(Guid userId, Guid postId)
        {
            var posts =  GetFavPostsDataByUserId(userId);
            var post = posts.FirstOrDefault(p => p.PostId == postId);
            if (post == null)
            {
                return false;
            }

            _dataContext.FavoritePosts.Remove(post);
            await _dataContext.SaveChangesAsync();
            return true;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;

namespace WebAPI.Repositories
{

        public interface IPostRepository : IRepository<Post>
        {
                public IQueryable<Post> GetAllAsQueryable();
        }

        public class PostRepository : IPostRepository
        {
                private readonly DataContext _dataContext;

                public PostRepository(DataContext dataContext)
                {
                        _dataContext = dataContext;
                }

                public async Task<Post> GetById(Guid id)
                { 
                        return await _dataContext.Posts.FindAsync(id);
                }

                public async Task<IEnumerable<Post>> GetAll()
                {
                        return await _dataContext.Posts.ToListAsync();
                }
                
                public IQueryable<Post> GetAllAsQueryable()
                {
                        return _dataContext.Posts.AsQueryable();
                }
                public async Task<Post> Add(Post entity)
                {
                        await _dataContext.Posts.AddAsync(entity);
                        await _dataContext.SaveChangesAsync();
                        return entity;
                }

                public async Task<bool> Remove(Guid id)
                {
                        var post = await GetById(id);
                        if (post == null)
                        {
                                return false;
                        }
                        _dataContext.Remove(post);
                        await _dataContext.SaveChangesAsync();
                        return true;
                }

                public async Task<bool> Update(Guid id, Post entity)
                {
                        var post = await GetById(id);
                        if (post == null)
                        {
                                return false;
                        }
                        
                        post.ForRent = entity.ForRent;
                        post.Title = entity.Title;
                        post.Price = entity.Price;
                        post.Currency = entity.Currency;
                        post.CityLabel = entity.CityLabel;
                        post.Latitude = entity.Longitude;
                        post.SurfaceBuilt = entity.SurfaceBuilt;
                        post.SurfaceUseful = entity.SurfaceUseful;
                        post.Bedrooms = entity.Bedrooms;
                        post.Bathrooms = entity.Bathrooms;
                        post.Type = entity.Type;
                        post.Condition = entity.Condition;
                        post.Partitioning = entity.Partitioning;

                        _dataContext.Update(post);
                        await _dataContext.SaveChangesAsync();

                        return true;
                }

        }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Data;
using WebAPI.Entities;
using WebAPI.Models.Posts;

namespace WebAPI.Repositories
{

        public interface IPostRepository : IRepository<Post>
        {
                public IQueryable<Post> GetAllAsQueryable();
                public IQueryable<CompactPostResponse> GetAllCompactAsQueryable();

                public Task<int> GetTotalPostNumber();

                public Task<bool> AddMultiple(IEnumerable<Post> posts);

                public Task<int> RemoveMultiple();
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
                
                public IQueryable<CompactPostResponse> GetAllCompactAsQueryable()
                {
                        return _dataContext.Posts.Select(p => new CompactPostResponse() 
                        { 
                                Id = p.Id,
                                Title = p.Title, 
                                Latitude = p.Latitude,
                                Longitude = p.Longitude,
                                MapRadius = p.MapRadius
                        }).AsQueryable();
                }

                public async Task<int> GetTotalPostNumber()
                {
                        return await _dataContext.Posts.CountAsync();
                }

                public async Task<bool> AddMultiple(IEnumerable<Post> posts)
                {
                        await _dataContext.Posts.AddRangeAsync(posts);
                        await _dataContext.SaveChangesAsync();
                        return true;
                }

                public async Task<Post> Add(Post entity)
                {
                        await _dataContext.Posts.AddAsync(entity);
                        await _dataContext.SaveChangesAsync();
                        return entity;
                }

                public async Task<int> RemoveMultiple()
                {
                        //var postToDelete = _dataContext.Posts.Where(p => p.IsLocal == false).AsQueryable();
                        //_dataContext.RemoveRange(postToDelete);
                        int noOfRowDeleted = await _dataContext.Database.ExecuteSqlRawAsync("delete from Posts where IsLocal='false'");
                        //await _dataContext.SaveChangesAsync();
                        return noOfRowDeleted;
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
                        post.Description = entity.Description;
                        post.Price = entity.Price;
                        post.Currency = entity.Currency;
                        post.CityLabel = entity.CityLabel;
                        post.Latitude = entity.Latitude;
                        post.Longitude = entity.Longitude;
                        post.MapRadius = entity.MapRadius;
                        post.SurfaceBuilt = entity.SurfaceBuilt;
                        post.SurfaceUseful = entity.SurfaceUseful;
                        post.Bedrooms = entity.Bedrooms;
                        post.Bathrooms = entity.Bathrooms;
                        post.BuildingYear = entity.BuildingYear;
                        post.FloorPosition = entity.FloorPosition;
                        post.FloorsBuilding = entity.FloorsBuilding;
                        post.Type = entity.Type;
                        post.Condition = entity.Condition;
                        post.Partitioning = entity.Partitioning;

                        _dataContext.Update(post);
                        await _dataContext.SaveChangesAsync();

                        return true;
                }

        }
}
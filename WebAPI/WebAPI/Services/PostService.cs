using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPI.Entities;
using WebAPI.Models.Posts;
using WebAPI.Models.Queries;
using WebAPI.Repositories;

namespace WebAPI.Services
{
    
    public interface IPostService
    {
        Task<Post> GetPostById(Guid id);
        Task<IEnumerable<Post>> GetPostsByUserId(Guid id);
        Task<IEnumerable<Post>> GetPosts(PostsFilters filters = null, PaginationQuery paginationQuery = null);
        Task<IEnumerable<CompactPostResponse>> GetAllPostsCompact();
        Task<Post> AddPost(CreatePostModel request, Guid idUser);
        Task<bool> DeletePost(Guid id);
        Task<bool> UpdatePost(Guid id, UpdatePostModel request);
        Task<bool> UserOwnsPost(Guid postId, Guid userId);
        int GetTotalPostNumber(PostsFilters filters = null);
        Task<int> RemoveMultiple();
        Task<bool> AddMultiple(IEnumerable<Post> posts);
    }
    
    public class PostService : IPostService
    {
        private readonly IPostRepository _repository;
        private readonly IMapper _mapper;

        public PostService(IPostRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Post> GetPostById(Guid id)
        {
            return await _repository.GetById(id);
        }

        public async Task<IEnumerable<Post>> GetPostsByUserId(Guid id)
        {
            return await _repository.GetAllAsQueryable().Where(post => post.IdUser==id).ToListAsync();
        }

        public async Task<IEnumerable<Post>> GetPosts(PostsFilters filters = null, PaginationQuery paginationQuery = null)
        {
            var queryable = _repository.GetAllAsQueryable();
            if(filters is {Filters: true})
                queryable = AddFiltersOnQuery(filters, queryable);
            if (paginationQuery == null || paginationQuery.PageNumber < 1 || paginationQuery.PageSize < 1)
                return await queryable.Take(50).ToListAsync();

            var skip = (paginationQuery.PageNumber - 1) * paginationQuery.PageSize;
            return await queryable.Skip(skip).Take(paginationQuery.PageSize).ToListAsync();
        }

        private static IQueryable<Post> AddFiltersOnQuery(PostsFilters filters, IQueryable<Post> queryable)
        {
            if(filters.IdUser != null)
                queryable = queryable.Where(x => x.IdUser == filters.IdUser);
            if(filters.IsLocal != null)
                queryable = queryable.Where(x => x.IsLocal == filters.IsLocal);
            if(filters.ForRent != null)
                queryable = queryable.Where(x => x.ForRent == filters.ForRent);
            if(filters.PriceMin != null)
                queryable = queryable.Where(x => x.Price >= filters.PriceMin);
            if(filters.PriceMax != null)
                queryable = queryable.Where(x => x.Price <= filters.PriceMax);
            if(!string.IsNullOrEmpty(filters.CityLabel))
                queryable = queryable.Where(x => x.CityLabel == filters.CityLabel);
            if(filters.Bedrooms != null)
                queryable = queryable.Where(x => x.Bedrooms == filters.Bedrooms);
            if(filters.Bathrooms != null)
                queryable = queryable.Where(x => x.Bathrooms == filters.Bathrooms);
            if(!string.IsNullOrEmpty(filters.Type))
                queryable = queryable.Where(x => x.Type == filters.Type);
            if(!string.IsNullOrEmpty(filters.Partitioning))
                queryable = queryable.Where(x => x.Partitioning == filters.Partitioning);

            return queryable;
        }

        public async Task<IEnumerable<CompactPostResponse>> GetAllPostsCompact()
        {
            return await _repository.GetAllCompactAsQueryable().ToListAsync();
        }

        public async Task<Post> AddPost(CreatePostModel request, Guid idUser)
        {
            var post = _mapper.Map<Post>(request);
            post.IsLocal = true;
            post.IdUser = idUser;

            post.PhotosPaths = $"{request.PhotosNumber}";
            return await _repository.Add(post);
        }
        

        public async Task<bool> DeletePost(Guid id)
        {   
            var folderName = Path.Combine("Resources", "Images", id.ToString());
            var pathToDelete = Path.Combine(Directory.GetCurrentDirectory(), folderName);
            Directory.Delete(pathToDelete, true);

            var status = await _repository.Remove(id);
            return status;  
        }

        public async Task<bool> UpdatePost(Guid id, UpdatePostModel request)
        {
            var status = await _repository.Update(id, _mapper.Map<Post>(request));
            return status;
        }

        public async Task<bool> UserOwnsPost(Guid postId, Guid userId)
        {
            var post = await GetPostById(postId);
            return post.IdUser == userId;
        }

        public  int GetTotalPostNumber(PostsFilters filters = null)
        {
            var queryable = _repository.GetAllAsQueryable();
            if(filters is {Filters: true}) 
                queryable = AddFiltersOnQuery(filters, queryable);
            return  queryable.Count();
        }

        public async Task<int> RemoveMultiple()
        {
            return await _repository.RemoveMultiple();
        }

        public async Task<bool> AddMultiple(IEnumerable<Post> posts)
        {
            return await _repository.AddMultiple(posts);
        }
    }
}
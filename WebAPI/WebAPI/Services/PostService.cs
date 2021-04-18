using System;
using System.Collections.Generic;
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
        Task<IEnumerable<Post>> GetAllPosts(PaginationQuery paginationQuery = null);
        Task<Post> AddPost(CreatePostModel request, Guid idUser);
        Task<bool> DeletePost(Guid id);
        Task<bool> UpdatePost(Guid id, UpdatePostModel request);
        Task<bool> UserOwnsPost(Guid postId, Guid userId);
        Task<int> GetTotalPostNumber();
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

        public async Task<IEnumerable<Post>> GetAllPosts(PaginationQuery paginationQuery = null)
        {
            if (paginationQuery == null || paginationQuery.PageNumber < 1 || paginationQuery.PageSize < 1)
                return await _repository.GetAllAsQueryable().Take(50).ToListAsync();

            var skip = (paginationQuery.PageNumber - 1) * paginationQuery.PageSize;
            return await _repository.GetAllAsQueryable().Skip(skip).Take(paginationQuery.PageSize).ToListAsync();
        }

        public async Task<Post> AddPost(CreatePostModel request, Guid idUser)
        {
            var post = _mapper.Map<Post>(request);
            post.IsLocal = true;
            post.IdUser = idUser;
            return await _repository.Add(post);
        }

        public async Task<bool> DeletePost(Guid id)
        {
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
            if (post.IdUser == userId)
                return true;
            return false;
        }

        public async Task<int> GetTotalPostNumber()
        {
            return await _repository.GetTotalPostNumber();
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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Services;
using WebAPI.Entities;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using WebAPI.Models.Posts;
using WebAPI.Models.Queries;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : Controller
    {
        private readonly IPostService _postService;

        public PostsController(IPostService postService)
        {
            _postService = postService;
        }

        [HttpPost]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddPost(CreatePostModel post)
        {
            var currentUser = User.Identity?.Name ?? string.Empty;
            if (currentUser == string.Empty)
            {
                return BadRequest("You are not logged in");
            }
            
            var postCreated = await _postService.AddPost(post, Guid.Parse(currentUser));
            
            return postCreated == null ? BadRequest() : Ok(postCreated);
        }
        
        [HttpPost("AddMultiple")]
        [Authorize(Roles = Role.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddMultiplePosts(AddMultiplePostsModel model)
        {
            await _postService.AddMultiple(model.Posts);
            return  Ok();
        }
        
        [HttpDelete("DeleteMultiple")]
        [Authorize(Roles = Role.Admin)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteMultiplePosts()
        {
            var res = await _postService.RemoveMultiple();
            return  Ok(res);
        }
        
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetPosts([FromQuery] PaginationQuery paginationQuery)
        {
            var posts = await _postService.GetPosts(paginationQuery);
            var totalPostNumber = await _postService.GetTotalPostNumber();
            var postsResponse = new PostsResponse(totalPostNumber, posts, HttpContext.Request.GetDisplayUrl(), paginationQuery);
            return Ok(postsResponse);
        }
        
        [HttpGet("compact")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsCompact();
            return Ok(posts);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPostById(Guid id)
        {
            var posts = await _postService.GetPostById(id);
            if (posts == null)
                return NotFound();
            return Ok(posts);
        }
        
        [Authorize]
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Update(Guid id, [FromBody] UpdatePostModel request)
        {
            var currentUser = User.Identity?.Name ?? string.Empty;
            if (currentUser == string.Empty)
            {
                return BadRequest("You are not logged in");
            }
                
            var currentUserId = Guid.Parse(currentUser);
            var userOwnsPost = await _postService.UserOwnsPost(id, currentUserId);
            if ( !userOwnsPost && !User.IsInRole(Role.Admin))
            {
                return Forbid();
            }

            var response = await _postService.UpdatePost(id, request);
            if (!response)
            {
                return NotFound(id);
            }

            return NoContent();
        }
        
        [Authorize]
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(Guid id)
        {
            var currentUser = User.Identity?.Name ?? string.Empty;
            if (currentUser == string.Empty)
            {
                return BadRequest("You are not logged in");
            }
                
            var currentUserId = Guid.Parse(currentUser);
            var userOwnsPost = await _postService.UserOwnsPost(id, currentUserId);
            if ( !userOwnsPost && !User.IsInRole(Role.Admin))
            {
                return Forbid();
            }
            
            var response = await _postService.DeletePost(id);
            if (!response)
            {
                return NotFound(id);
            }

            return NoContent();
        }
        
    }
}
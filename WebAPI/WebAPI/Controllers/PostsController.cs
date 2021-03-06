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
        private readonly IUserService _userService;


        public PostsController(IPostService postService, IUserService userService)
        {
            _postService = postService;
            _userService = userService;
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
        public async Task<IActionResult> GetPosts([FromQuery] PostsFilters pf, [FromQuery] PaginationQuery paginationQuery)
        {
            Console.WriteLine(HttpContext.Request.QueryString);
            var filters = new PostsFilters(HttpContext.Request.Query);
            //filters.Display();

            var posts = await _postService.GetPosts(filters, paginationQuery);
            var totalPostNumber =  _postService.GetTotalPostNumber(filters);
            var postsResponse = new PostsResponse(totalPostNumber, posts, HttpContext.Request.GetDisplayUrl(), paginationQuery);
            return Ok(postsResponse);
        }
        
        [HttpGet("map")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postService.GetAllPostsCompact();
            return Ok(posts);
        }

        [HttpGet("{id:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPostById(Guid id)
        {
            var posts = await _postService.GetPostById(id);
            if (posts == null)
                return NotFound();
            return Ok(posts);
        }
        
        [HttpGet("user/{userId:guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetPostByUserId(Guid userId)
        {
            var user = await _userService.GetUserById(userId);
            if (user == null)
                return NotFound();
            var posts = await _postService.GetPostsByUserId(userId);
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
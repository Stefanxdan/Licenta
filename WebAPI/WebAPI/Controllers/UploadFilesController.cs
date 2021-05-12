using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadFilesController : Controller
    {
        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var formCollection = await Request.ReadFormAsync();
                var postId = formCollection["postId"].FirstOrDefault();
                
                if(postId == null)
                    return BadRequest();
                
                var folderName = Path.Combine("Resources", "Images", postId);
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                Directory.CreateDirectory(pathToSave);

                //var file = formCollection.Files.FirstOrDefault();
                IList<string> paths = new List<string>();
                var i = 1;
                foreach (var file in formCollection.Files)
                {
                    var name = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    if (name == null) continue;
                    
                    var fileName = $"{i++}.png";
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath =  Path.Combine("http://localhost:5000/",Path.Combine(folderName, fileName));

                    await using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        await file.CopyToAsync(stream);
                    }

                    paths.Add(dbPath);
                }
                var photoPaths =  string.Join("<>", paths);
                return Ok(new { photoPaths ,postId });

                
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }

        }
    }
}
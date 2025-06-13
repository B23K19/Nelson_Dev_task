using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NelAPI.Models;

namespace NelAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly ILogger<ValuesController> _logger;

        public ValuesController(ILogger<ValuesController> logger)
        {
            _logger = logger;
        }

        [HttpPost("webhook/sort")]
        public async Task<ActionResult<object>> SortInputWords([FromBody] InputDto input)
        {
            if (string.IsNullOrWhiteSpace(input?.data))
            {
                _logger.LogWarning("Webhook received with empty or null 'data'.");
                return BadRequest(new { error = "The 'data' field must not be null or empty." });
            }

            try
            {
                var sortedChars = input.data
                    .ToCharArray()
                    .OrderBy(c => c)
                    .ToArray();


                return Ok(new { word = sortedChars });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error while processing webhook input.");
                return StatusCode(500, new { error = "An internal error occurred while processing the request." });
            }
        }
    }
}

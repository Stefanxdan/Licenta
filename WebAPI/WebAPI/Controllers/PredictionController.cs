using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;
using WebAPI.Models.Prediction;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PredictionController : ControllerBase
    {

        private readonly PredictionEnginePool<PredictionInput, PredictionOutput> _predictionEnginePool;


        public PredictionController(PredictionEnginePool<PredictionInput, PredictionOutput> predictionEnginePool)
        {
            this._predictionEnginePool = predictionEnginePool;
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<PredictionOutput> Prediction([FromBody] PredictionInput input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var prediction = _predictionEnginePool.Predict(modelName: "PricePredictionModel", example: input);
            return Ok(prediction);
        }
    }
}

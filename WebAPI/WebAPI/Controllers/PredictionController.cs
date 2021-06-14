using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.ML;
using WebAPI.Models.Prediction;
using WebAPIML.Model;

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
        public async Task<ActionResult<PredictionResults>> Prediction([FromBody] PredictionInput input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var prediction = _predictionEnginePool.Predict(modelName: "PricePredictionModel", example: input);
            var modelInput = new ModelInput()
            {
                Bathrooms = input.Bathrooms,
                Bedrooms = input.Bedrooms,
                City_label = input.CityLabel
            };
            var modelOutput = await Task.Run(() =>ConsumeModel.Predict(modelInput));
            var results = new PredictionResults(prediction, modelOutput);
            return Ok(results);
        }
        
    }
}

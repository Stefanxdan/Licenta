using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models.Prediction
{
    public class PredictionOutput : PredictionInput
    {
        public float Score { get; set; }
    }
}

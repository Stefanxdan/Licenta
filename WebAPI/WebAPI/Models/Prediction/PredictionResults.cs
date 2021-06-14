using WebAPIML.Model;


namespace WebAPI.Models.Prediction

{
    
    public class PredictionResults
    {
        public  PredictionResults(PredictionOutput p1, ModelOutput m)
        {
            Price = p1.Score;
            PriceByCity = m.Score;
        }

        public float Price { get; set; }
        public float PriceByCity { get; set; }

    }
}
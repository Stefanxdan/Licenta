using Microsoft.ML.Data;

namespace WebAPI.Models.Prediction
{
    public class PredictionInput
    {
        [ColumnName("Bedrooms"), LoadColumn(0)]
        public float Bedrooms { get; set; }


        [ColumnName("Bathrooms"), LoadColumn(1)]
        public float Bathrooms { get; set; }


        [ColumnName("City_label"), LoadColumn(2)]
        public string CityLabel { get; set; }

    }
}

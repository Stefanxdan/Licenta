// This file was auto-generated by ML.NET Model Builder. 

using Microsoft.ML.Data;

namespace WebAPIML.Model
{
    public class ModelInput
    {
        [ColumnName("Bedrooms"), LoadColumn(0)]
        public float Bedrooms { get; set; }


        [ColumnName("Bathrooms"), LoadColumn(1)]
        public float Bathrooms { get; set; }


        [ColumnName("City_label"), LoadColumn(2)]
        public string City_label { get; set; }


        [ColumnName("Price"), LoadColumn(3)]
        public float Price { get; set; }


    }
}

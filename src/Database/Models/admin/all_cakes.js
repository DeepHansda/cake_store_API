const mongoose = require("mongoose");

const CakeSchema = mongoose.Schema(
  {
    cake_name: {
      type: String,
    },
    cake_description: {
      type: String,
    },
    weight: {
      type: String,
    },
    price: {
      type: String,
    },
    images:{
      img:{
        type: String,
      }
    }
  });

const add_cake_model = mongoose.model("Added_Cake",CakeSchema);

module.exports = add_cake_model;

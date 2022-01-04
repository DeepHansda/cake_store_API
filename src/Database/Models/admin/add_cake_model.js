const mongoose = require("mongoose");

const CakeSchema = mongoose.Schema(
  {
    cake_name: {
      type: String,
    },
    cake_shape: {
      type: String,
    },
    flavour: {
      type: String,
    },
    occasion: {
      type: String,
    },
    theme: {
      type: String,
    },
    type: {
      type: String,
    },
    measurement: {
      type: String,
    },
    unit: {
      type: String,
    },
    what_cake: {
      type: String,
    },
    mrp: {
      type: String,
    },
    purchase_price: {
      type: String,
    },
    sales_price: {
      type: String,
    },
    any_offers: {
      type: String,
    }
  });

const add_cake_model = mongoose.model("Added_Cake",CakeSchema);

module.exports = add_cake_model;

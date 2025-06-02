const { default: mongoose } = require("mongoose");




const foodModel = new mongoose.Schema({
    name: String,
    price: Number,
    img_path: String,
    description: String,
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurants"
    }
});


export const foodSchema = mongoose.models.foods || mongoose.model("foods", foodModel)
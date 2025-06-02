const { default: mongoose } = require("mongoose");




const orderModel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    foodItemIds: String,
    restaurant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "restaurant"
    },
    deliveryBoy_id: mongoose.Schema.Types.ObjectId,
    status: String,
    amount: String,
});



export const orderSchema = mongoose.models.orders || mongoose.model("orders", orderModel); 
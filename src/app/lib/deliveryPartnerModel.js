const { default: mongoose, mongo } = require("mongoose");





const DeliveryPartnerModel = new mongoose.Schema({
    name: String,
    mobile: String,
     password: String,
    city: String,
    address: String,
});


export const deliveryPartnerSchema = mongoose.models.deliveryPartners
    || mongoose.model("deliveryPartners", DeliveryPartnerModel);


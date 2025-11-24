import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  registrationNo: { type: String, required: true },
  businessType: { type: String, required: true },

  address: {
    registeredAddress: String,
    businessAddress: String,
    country: String,
    state: String,
    postalCode: String,
  },

  gpsLocation: {
    lat: Number,
    lng: Number,
  },

  contactPerson: String,
  email: String,
  phone: String,
});

export default mongoose.model("Company", companySchema);

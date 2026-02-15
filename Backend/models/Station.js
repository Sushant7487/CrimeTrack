// const mongoose = require('mongoose');

// const stationSchema = mongoose.Schema({
//   name: { type: String, required: true, unique: true },
//   district: { type: String, default: "Chandrapur" }, 
//   city: { type: String },
//   // ✅ NEW: Location Field (GeoJSON format is standard for maps)
//   location: {
//       lat: { type: Number },
//       lng: { type: Number },
//       address: { type: String } // Optional: To store full address from map
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Station', stationSchema);












const mongoose = require('mongoose');

const stationSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  district: { type: String, default: "Chandrapur" }, 
  city: { type: String },
  // ✅ Location Field (GeoJSON style lat/lng)
  location: {
      lat: { type: Number },
      lng: { type: Number },
      address: { type: String } // Optional: To store full address
  }
}, { timestamps: true });

module.exports = mongoose.model('Station', stationSchema);
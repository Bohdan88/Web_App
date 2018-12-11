var mongoose     = require('mongoose');
var Patient       = mongoose.Schema;

var Patients   = new Patient({
    full_name: String,
    doctor:String,
    adress: String,
    phone : Number,
    disease: String,
    records: String,
    status: String
}, {
    versionKey: false 
});




module.exports = mongoose.model('Patient', Patients)


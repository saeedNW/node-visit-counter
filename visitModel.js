/** import mongoose */
const {default: mongoose} = require("mongoose");
/** extract schema method from mongoose module */
const {Schema} = mongoose;

/** define visits counter collection schema */
const visitSchema = new Schema({
    counter: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Visit', visitSchema);

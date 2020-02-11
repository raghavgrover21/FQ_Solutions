const mongoose = require("mongoose");

const Event = mongoose.model('Event', {
    
    //primary key - organizer_id
    organizer_id: Number,
    name: String,
    organizer: String,
    sponsors: [String]
})
module.exports = Event;
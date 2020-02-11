const mongoose = require("mongoose");

const Event = mongoose.model('Event', {
    
    //primary key - organizer_id
    organizer_id: Number,
    event_name: String,
    organizer_name: String,
    sponsors: [String]
})
module.exports = Event;
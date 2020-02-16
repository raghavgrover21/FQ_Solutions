const mongoose = require("mongoose");

const Event = mongoose.model('Event', {
    
    //primary key - organizer_id
    organizer_id: Number,
    event_name: String,
    organizer_name: String,
    sponsors: [String],
    is_active: Boolean,
    is_private : Boolean,
})
module.exports = Event;
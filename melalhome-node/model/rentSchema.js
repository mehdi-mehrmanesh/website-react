const mongoose = require('mongoose');

const RentsSchema = mongoose.Schema({
    address:String,
    age:Number,
    cabinets:String,
    description:String,
    elevator:Boolean,
    floor:Number,
    floor_count:Number,
    floorـcovering:String,
    meterage:Number,
    mobile:Number,
    mortgage:Number,
    oven:Boolean,
    ownerName:String,
    parking:Boolean,
    property_type:String,
    post_type:String,
    region:String,
    rent:Number,
    room_count:Number,
    street:String,
    submit_date:String,
    terrace:Boolean,
    toilet:Boolean,
    unit_count:Number,
    view:String,
    warehouse:Boolean,
    images:Array,
    is_published:Boolean

})

const Rents = mongoose.model('rents',RentsSchema);
module.exports = Rents;
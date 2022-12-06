const mongoose = require('mongoose');

const saleSchema = mongoose.Schema({
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
    oven:Boolean,
    ownerName:String,
    parking:Boolean,
    property_type:String,
    post_type:String,
    region:String,
    sale:Number,
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

  const Sale = mongoose.model('sales',saleSchema);
  module.exports = Sale;
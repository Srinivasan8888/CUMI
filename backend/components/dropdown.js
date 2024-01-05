import mongoose from  'mongoose';
const Data = new mongoose.Schema({
    dropdown: String,
})
const DropdownModel = mongoose.model("dropdown",Data)
export default DropdownModel;




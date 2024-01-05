import mongoose from  'mongoose';
const Device = new mongoose.Schema({
    input:String,
})
const InputModel = mongoose.model("Devices",Device)
export default InputModel;


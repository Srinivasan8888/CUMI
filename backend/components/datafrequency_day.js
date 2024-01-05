import mongoose from 'mongoose';
const day = new mongoose.Schema({
    day:String,
})
const DayModel = mongoose.model("dayslimts",day)
export default DayModel
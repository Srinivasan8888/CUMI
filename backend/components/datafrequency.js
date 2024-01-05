import mongoose from  'mongoose';

const datafrequence = new mongoose.Schema({
    day: String,
});
const DataFrequency =mongoose.model('dayslimt',datafrequence);
export default DataFrequency;
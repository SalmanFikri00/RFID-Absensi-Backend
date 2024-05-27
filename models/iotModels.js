import mongoose from "mongoose";

const iotSchema = mongoose.Schema({
    kode_id: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    }

},{
    timeStamp: true
})


const Iot = mongoose.model('iot', iotSchema)

export default Iot
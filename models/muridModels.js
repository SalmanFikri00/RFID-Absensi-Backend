import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const muridSchema = mongoose.Schema({
    RF_ID: {
        type: String,
        required: true
    },
    kelas: {
        type: String,
        required: true
    },
    nama : {
        type: String,
        required: false
    },
    alamat: {
        type: String,
        required: false
    },
    nis: {
        type: String,
        required: false,
    }
},{
    timeStamp: true
})

// userSchema.pre('save', async function(next){
//     if(!this.isModified('password')){
//         next()
//     }

//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

// userSchema.methods.matchPasswords = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword, this.password)
// } 

const Murid = mongoose.model('murid', muridSchema)

export default Murid
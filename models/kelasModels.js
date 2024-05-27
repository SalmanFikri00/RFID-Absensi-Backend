import mongoose from 'mongoose';

const kelasSchema = new mongoose.Schema({
    nama_kelas: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Kelas = mongoose.model('Kelas', kelasSchema);

export default Kelas;

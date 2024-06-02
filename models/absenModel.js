import mongoose from 'mongoose';

const absenModel = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    kelas: {
        type: String,
        required: true
    },
    keterangan: {
        type: String,
        required: true,
        enum: ['Masuk', 'Terlambat'],
    },
    tanggal: {
        type: String,
    }
}, {
    timestamps: true
});

const Absen = mongoose.model('Absen', absenModel);

export default Absen; 

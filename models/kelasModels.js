import mongoose from 'mongoose';

const kelasSchema = new mongoose.Schema({
    nama_kelas: {
        type: String,
        allowNull: false,
    },
    edit_by: {
        type: String,
    }
}, {
    timestamps: true
});

const Kelas = mongoose.model('Kelas', kelasSchema);

export default Kelas; 

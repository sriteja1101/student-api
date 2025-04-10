import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  department: String,
  admissionDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Student', studentSchema);



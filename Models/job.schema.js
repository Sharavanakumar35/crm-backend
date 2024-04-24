import mongoose from 'mongoose';

const { Schema } = mongoose;

const JobSchema = new Schema({
    name: String,
    email: String,
    image: String,
    company: String,
    position: String,
    experience: String,
    performance: String,
    jobLocation: {
        type: String,
        default: 'Unknown'
    },
    jobStatus: {
        type: String,
        enum: ['open', 'closed', 'pending'],
        default: 'pending',
    },
    jobType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship'],
        default: 'full-time',
    }, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
    }
}, { timestamps: true });

const Job = mongoose.model('Job', JobSchema, 'jobs');

export default Job;

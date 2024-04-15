import Job from "../Models/job.schema.js";

const jobController = {
    createJob: async (request, response) => {
        try {
            const { company, position, jobLocation, jobStatus, jobType } = request.body;
            const newJob = new Job({
                company,
                position,
                jobLocation,
                jobStatus,
                jobType,
                user: request.userId
            });
            await newJob.save();
            response.status(201).json({ message: 'Job created successfully', job: newJob });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },
    getAllJobs: async (request, response) => {
        try {
            const jobs = await Job.find();
            response.status(200).json({ jobs });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },

    getJob: async (request, response) => {
        try {
            const { id } = request.params;
            const job = await Job.findById(id);
            if (!job) {
                return response.status(404).json({ message: 'Job not found' });
            }
            response.status(200).json({ job });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },

    updateJob: async (request, response) => {
        try {
            const { id } = request.params;
            const { company, position, jobLocation, jobStatus, jobType } = request.body;
            const updatedJob = await Job.findByIdAndUpdate(id, {
                company,
                position,
                jobLocation,
                jobStatus,
                jobType
            }, { new: true });
            if (!updatedJob) {
                return response.status(404).json({ message: 'Job not found' });
            }
            response.status(200).json({ message: 'Job updated successfully', job: updatedJob });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    },

    deleteJob: async (request, response) => {
        try {
            const { id } = request.params;
            const deletedJob = await Job.findByIdAndDelete(id);
            if (!deletedJob) {
                return response.status(404).json({ message: 'Job not found' });
            }
            response.status(200).json({ message: 'Job deleted successfully' });
        } catch(error) {
            response.status(500).json({ message: error.message });
        }
    }
};

export default jobController;

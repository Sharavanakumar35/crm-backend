import Job from "../Models/job.schema.js";
import nodemailer from "nodemailer";

const jobController = {
    createJob: async (request, response) => {
        try {
            const { name, image, email, company, position, experience, jobLocation, jobStatus, jobType, performance } = request.body;
            const newJob = new Job({
                name,
                image,
                email,
                company,
                position,
                performance,
                experience,
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
    // getAllJobs: async (request, response) => {
    //     try {
    //         const jobs = await Job.find();
    //         response.status(200).json({ jobs });
    //     } catch(error) {
    //         response.status(500).json({ message: error.message });
    //     }
    // },

    getAllJobs: async (request, response) => {
        try {
            // Get the user ID from the cookie
            const userId = request.userId;
    
            // Check if userId is provided in the cookie
            if (!userId) {
                return response.status(400).json({ message: "User ID not provided in the cookie" });
            }
    
            // Find jobs with the specified user ID
            const jobs = await Job.find({ user: userId });
    
            // Return the filtered jobs
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
            const { name, company, image, email, position, experience, performance, jobLocation, jobStatus, jobType } = request.body;
            const updatedJob = await Job.findByIdAndUpdate(id, {
                name,
                image,
                email,
                company,
                position,
                experience,
                performance,
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
    },

    sendMail: async (request, response) => {
        const {email, subject, message, html, attachments} = request.body;
        console.log(request.cookies);
        try {
            // console.log(request.pass);
            // const testAccount = await nodemailer.createTestAccount();
            const transporter = nodemailer.createTransport({
                // host: "smtp.ethereal.email",
                // secure: false,
                // port: 589,
                // auth: {
                //     user: testAccount.user,
                //     pass: testAccount.pass
                // },
                service: "gmail",
                auth: {
                    user: request.cookies.email,
                    pass: request.cookies.pass,
                }
            });
    
            const mail_config = {
                from: "shark.35.kumar@gmail.com",
                to: email,
                subject,
                text: message,
                html,
                attachments
            }
    
            transporter.sendMail(mail_config);
            response.status(200).json({ message: 'Mail Sent successfully' });
        } catch (error) {
            response.status(500).json({message: "Error occured while sending mail"})
        }

    }
};

export default jobController;

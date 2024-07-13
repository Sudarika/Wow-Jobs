const Job = require('../models/jobModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

exports.createJob = async (req, res) => {
    try {
        const employer = await User.findById(req.body.employer);
        if (!employer) {
            return res.status(404).json({ error: 'Employer not found' });
        }

        const newJob = new Job({
            employer: employer._id,
            title: req.body.title,
            description: req.body.description,
            requirements: req.body.requirements,
            applicationInstructions: req.body.applicationInstructions,
            location: req.body.location,
            industry: req.body.industry,
            jobType: req.body.jobType
        });

        await newJob.save();

        res.status(201).json(newJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.updateJob = async (req, res) => {
    try {
        console.log('Received update job request:', req.body);

        if (!req.body.employer) {
            console.error('Error: Employer is required');
            return res.status(400).json({ error: 'Employer is required' });
        }

        const jobId = req.params.id;
        if (!jobId) {
            console.error('Error: Job ID is missing');
            return res.status(400).json({ error: 'Job ID is missing' });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            console.error('Error: Job not found');
            return res.status(404).json({ error: 'Job not found' });
        }

        const employer = await User.findById(req.body.employer);
        if (!employer) {
            console.error('Error: Employer not found');
            return res.status(404).json({ error: 'Employer not found' });
        }

        job.title = req.body.title || job.title;
        job.description = req.body.description || job.description;
        job.requirements = req.body.requirements || job.requirements;
        job.applicationInstructions = req.body.applicationInstructions || job.applicationInstructions;
        job.location = req.body.location || job.location;
        job.industry = req.body.industry || job.industry;
        job.jobType = req.body.jobType || job.jobType;

        const updatedJob = await job.save();

        console.log('Job updated successfully:', updatedJob);
        res.status(200).json(updatedJob);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        console.error('Error viewing jobs:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if (!deletedJob) {
            console.error('Job not found');
            return res.status(404).json({ error: 'Job not found' });
        }
        console.log('Job deleted successfully:', deletedJob);
        res.json({ message: 'Job deleted', deletedJob });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
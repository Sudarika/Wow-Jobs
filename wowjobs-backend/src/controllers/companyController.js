const Company = require('../models/companyModel');
const Job = require('../models/jobModel');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.createCompany = async (req, res) => {
    try {
        const { companyName, email, password, description, location, industry, companySize, websiteUrl } = req.body;

        const existingCompany = await Company.findOne({ email });
        if (existingCompany) {
            return res.status(400).json({ message: 'Company already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newCompany = new Company({
            companyName,
            email,
            password: hashedPassword,
            profile: {
                description,
                location,
                industry,
                companySize,
                websiteUrl
            },
            userType: 'company'
        });

        const savedCompany = await newCompany.save();

        res.status(201).json(savedCompany);
    } catch (error) {
        console.error('Error creating company:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.companyLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt with email:', email);

        const company = await Company.findOne({ email });
        console.log('Company found:', company);

        if (!company) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, company.password);
        console.log('Password comparison result:', validPassword);

        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: company._id, email: company.email, userType: company.userType },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


exports.viewApplications = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send('Unauthorized');
        }

        const company = await Company.findById(req.user.id);
        if (!company) {
            return res.status(404).send('Company not found');
        }

        const jobs = await Job.find({ employer: company._id }).populate('applicants.applicant', 'username email');
        res.send(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateCompanyProfile = async (req, res) => {
    try {
        const companyId = req.user.id;
        const updateFields = {
            'profile.description': req.body.description,
            'profile.location': req.body.location,
            'profile.industry': req.body.industry,
            'profile.companySize': req.body.companySize,
            'profile.websiteUrl': req.body.websiteUrl
        };

        const updatedCompany = await Company.findByIdAndUpdate(
            companyId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedCompany) return res.status(404).send('Company not found');

        res.send(updatedCompany);
    } catch (err) {
        console.error('Error updating company profile:', err);
        res.status(500).send('An error occurred while updating the profile.');
    }
};

exports.getCompanyProfile = async (req, res) => {
    try {
        const company = await Company.findById(req.user.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.createJob = async (req, res) => {
    try {
        const company = await Company.findById(req.user.id);
        if (!company) {
            return res.status(404).send('Company not found');
        }

        const newJob = new Job({
            employer: company._id,
            title: req.body.title,
            description: req.body.description,
            requirements: req.body.requirements,
            applicationInstructions: req.body.applicationInstructions,
            location: req.body.location,
            industry: req.body.industry,
            jobType: req.body.jobType
        });

        await newJob.save();

        company.jobsPosted.push(newJob._id);
        await company.save();

        res.status(201).json(newJob);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const companyId = req.user.id;
        const jobId = req.params.id;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).send('Company not found');
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send('Job not found');
        }

        if (String(job.employer) !== String(company._id)) {
            return res.status(403).send('Unauthorized');
        }

        job.title = req.body.title || job.title;
        job.description = req.body.description || job.description;
        job.requirements = req.body.requirements || job.requirements;
        job.applicationInstructions = req.body.applicationInstructions || job.applicationInstructions;
        job.location = req.body.location || job.location;
        job.industry = req.body.industry || job.industry;
        job.jobType = req.body.jobType || job.jobType;

        const updatedJob = await job.save();

        res.status(200).json(updatedJob);
    } catch (err) {
        console.error('Error updating job:', err);
        res.status(500).send('An error occurred while updating the job.');
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const companyId = req.user.id;
        const jobId = req.params.id;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).send('Company not found');
        }

        if (!company.jobsPosted.includes(jobId)) {
            return res.status(403).send('Unauthorized');
        }

        company.jobsPosted = company.jobsPosted.filter(job => String(job) !== jobId);
        await company.save();

        await Job.findByIdAndDelete(jobId);

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (err) {
        console.error('Error deleting job:', err);
        res.status(500).send('An error occurred while deleting the job.');
    }
};

exports.viewPostedJobs = async (req, res) => {
    try {
        const company = await Company.findById(req.user.id);
        if (!company) {
            return res.status(404).send('Company not found');
        }

        const postedJobs = await Job.find({ employer: company._id });
        res.json(postedJobs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewReceivedJobApplications = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send('Unauthorized');
        }

        const company = await Company.findById(req.user.id);
        if (!company) {
            return res.status(404).send('Company not found');
        }

        const jobs = await Job.find({ employer: company._id }).populate({
            path: 'applicants.applicant',
            model: 'User',
            select: 'username email profile'
        });

        res.send(jobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.acceptJobApplication = async (req, res) => {
    try {
        const { jobId, applicantId } = req.params;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send('Job not found');
        }

        const applicantIndex = job.applicants.findIndex(applicant => String(applicant.applicant) === applicantId);
        if (applicantIndex === -1) {
            return res.status(404).send('Applicant not found for this job');
        }

        job.applicants[applicantIndex].status = 'accepted';
        await job.save();

        res.status(200).send('Job application accepted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.rejectJobApplication = async (req, res) => {
    try {
        const { jobId, applicantId } = req.params;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send('Job not found');
        }

        const applicantIndex = job.applicants.findIndex(applicant => String(applicant.applicant) === applicantId);
        if (applicantIndex === -1) {
            return res.status(404).send('Applicant not found for this job');
        }

        job.applicants[applicantIndex].status = 'rejected';
        await job.save();

        res.status(200).send('Job application rejected successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.viewAcceptedJobApplications = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).send('Unauthorized');
        }

        const company = await Company.findById(req.user.id);
        if (!company) {
            return res.status(404).send('Company not found');
        }

        const jobs = await Job.find({ employer: company._id });

        const jobsWithAcceptedApplicants = jobs.filter(job => {
            return job.applicants.some(applicant => applicant.status === 'accepted');
        });

        const populatedJobs = await Promise.all(jobsWithAcceptedApplicants.map(async job => {
            const populatedApplicants = await Promise.all(job.applicants
                .filter(applicant => applicant.status === 'accepted')
                .map(async applicant => {
                    const user = await User.findById(applicant.applicant);
                    return {
                        ...applicant.toObject(),
                        applicant: user ? user.toObject() : null
                    };
                }));
            return {
                ...job.toObject(),
                applicants: populatedApplicants
            };
        }));

        res.send(populatedJobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


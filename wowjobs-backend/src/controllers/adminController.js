const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const Institute = require('../models/instituteModel');
const auth = require('../middleware/auth');
const Consultant = require('../models/consultantModel');
const Job = require('../models/jobModel');
const Course = require('../models/courseModel');
const validation = require('../middleware/validation');
const { hashPassword, comparePassword, generateToken } = require('../middleware/auth');
const { validateAdminRegistration, validateAdminLogin } = require('../middleware/validation');
const { validateConsultantRegistration } = require('../middleware/validation');

exports.registerAdmin = async (req, res) => {
    try {
        const { error } = validateAdminRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingAdmin = await Admin.findOne({ email: req.body.email });
        if (existingAdmin) return res.status(400).send('Admin already registered.');

        const hashedPassword = await hashPassword(req.body.password);

        const admin = new Admin({
            adminName: req.body.adminName,
            email: req.body.email,
            password: hashedPassword,
            userType: req.body.userType
        });

        await admin.save();

        const token = generateToken(admin);

        res.header('x-auth-token', token).send({
            _id: admin._id,
            adminName: admin.adminName,
            email: admin.email,
            userType: admin.userType
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering admin.');
    }
};

exports.adminLogin = async (req, res) => {
    try {
        const { error } = validateAdminLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const admin = await Admin.findOne({ email: req.body.email });
        if (!admin) return res.status(400).send('Invalid email or password.');

        const validPassword = await comparePassword(req.body.password, admin.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');

        const token = generateToken(admin);

        res.header('x-auth-token', token).send({
            _id: admin._id,
            adminName: admin.adminName,
            email: admin.email,
            userType: admin.userType,
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in.');
    }
};


exports.getDashboardCounts = async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const companiesCount = await Company.countDocuments();
        const institutesCount = await Institute.countDocuments();
        const jobsCount = await Job.countDocuments();
        const coursesCount = await Course.countDocuments();

        res.json({
            usersCount,
            companiesCount,
            institutesCount,
            jobsCount,
            coursesCount
        });
    } catch (error) {
        console.error('Error fetching dashboard counts:', error);
        res.status(500).send('Error fetching dashboard counts');
    }
};


exports.viewAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.userId });
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
};

exports.viewAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.send(companies);
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).send('Error fetching companies');
    }
};

exports.getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.companyId;

        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).send('Company not found');
        }

        res.send(company);
    } catch (error) {
        console.error('Error fetching company by ID:', error);
        res.status(500).send('Error fetching company');
    }
};

exports.deleteCompanyById = async (req, res) => {
    try {
        const companyId = req.params.companyId;

        const deletedCompany = await Company.findByIdAndDelete(companyId);
        if (!deletedCompany) {
            return res.status(404).send('Company not found');
        }

        res.send('Company deleted');
    } catch (error) {
        console.error('Error deleting company:', error);
        res.status(500).send('Error deleting company');
    }
};


exports.viewAllInstitutes = async (req, res) => {
    try {
        const institutes = await Institute.find();
        res.send(institutes);
    } catch (error) {
        console.error('Error fetching institutes:', error);
        res.status(500).send('Error fetching institutes');
    }
};

exports.deleteInstituteById = async (req, res) => {
    try {
        const deletedInstitute = await Institute.findOneAndDelete({ _id: req.params.instituteId });
        if (!deletedInstitute) {
            return res.status(404).send('Institute not found');
        }
        res.send('Institute deleted');
    } catch (error) {
        console.error('Error deleting institute:', error);
        res.status(500).send('Error deleting institute');
    }
};


exports.registerConsultant = async (req, res) => {
    try {
        const { error } = validateConsultantRegistration(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const existingConsultant = await Consultant.findOne({ email: req.body.email });
        if (existingConsultant) return res.status(400).send('Consultant already registered.');

        const hashedPassword = await hashPassword(req.body.password);

        const consultant = new Consultant({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            profile: req.body.profile,
            userType: 'consultant'
        });

        await consultant.save();

        res.status(201).send('Consultant account created successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering consultant.');
    }
};

exports.deleteConsultantById = async (req, res) => {
    try {
        const deletedConsultant = await Consultant.findByIdAndDelete(req.params.consultantId);
        if (!deletedConsultant) {
            return res.status(404).send('Consultant not found');
        }
        res.send('Consultant deleted');
    } catch (error) {
        console.error('Error deleting consultant:', error);
        res.status(500).send('Error deleting consultant');
    }
};

exports.viewAllConsultants = async (req, res) => {
    try {
        const consultants = await Consultant.find();
        res.send(consultants);
    } catch (error) {
        console.error('Error fetching consultants:', error);
        res.status(500).send('Error fetching consultants');
    }
};


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.send(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).send('Error fetching jobs');
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.jobId);
        if (!job) {
            return res.status(404).send('Job not found');
        }
        res.send(job);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).send('Error fetching job');
    }
};

exports.updateJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.jobId, req.body, { new: true });
        if (!updatedJob) {
            return res.status(404).send('Job not found');
        }
        res.send(updatedJob);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).send('Error updating job');
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const deletedJob = await Job.findByIdAndDelete(req.params.jobId);
        if (!deletedJob) {
            return res.status(404).send('Job not found');
        }
        res.send('Job deleted');
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).send('Error deleting job');
    }
};

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.send(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).send('Error fetching courses');
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        res.send(course);
    } catch (error) {
        console.error('Error fetching course:', error);
        res.status(500).send('Error fetching course');
    }
};

exports.updateCourse = async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.courseId, req.body, { new: true });
        if (!updatedCourse) {
            return res.status(404).send('Course not found');
        }
        res.send(updatedCourse);
    } catch (error) {
        console.error('Error updating course:', error);
        res.status(500).send('Error updating course');
    }
};

exports.deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.courseId);
        if (!deletedCourse) {
            return res.status(404).send('Course not found');
        }
        res.send('Course deleted');
    } catch (error) {
        console.error('Error deleting course:', error);
        res.status(500).send('Error deleting course');
    }
};
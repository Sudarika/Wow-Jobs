const User = require('../models/userModel');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');
const Job = require('../models/jobModel');
const Company = require('../models/companyModel');
const mongoose = require('mongoose');
const Course = require('../models/courseModel');
const Consultant = require('../models/consultantModel');
const Kuppi = require('../models/KuppiModel');

exports.registerUser = async (req, res) => {
    const {error} = validation.validateUserRegistration(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const userExists = await User.findOne({username: req.body.username});
    if (userExists) return res.status(400).send('Username already exists');

    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.status(400).send('Email already exists');

    const hashedPassword = await auth.hashPassword(req.body.password);

    const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email,
        profile: req.body.profile,
        contact: req.body.contact,
        userType: req.body.userType
    });

    try {
        const savedUser = await user.save();
        res.send({user: savedUser._id});
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.loginUser = async (req, res) => {
    const { error } = validation.validateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).send('Username does not exist');

    const validPassword = await auth.comparePassword(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid password');

    const token = auth.generateToken(user);
    res.send({ token, userId: user._id });
};



exports.viewProfile = async (req, res) => {
    const user = await User.findById(req.user.id);
    if (!user) {
        console.log(`No user found with ID: ${req.user.id}`);
        return res.status(404).send('User not found');
    }
    res.send(user);
};

exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const { profile } = req.body;

        user.profile.firstName = profile.firstName;
        user.profile.lastName = profile.lastName;
        user.profile.title = profile.title;
        user.profile.company = profile.company;
        user.profile.location = profile.location;
        user.profile.bio = profile.bio;

        await user.save();

        res.status(200).json({ success: true, message: 'Profile updated successfully' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


exports.deleteAccount = async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.user.id });
        if (!deletedUser) {
            console.log(`No user found with ID: ${req.user.id}`);
            return res.status(404).send('User not found');
        }
        res.send('Account deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.changePassword = async (req, res) => {
    const { error } = validation.validatePasswordChange(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.user.id);
    if (!user) {
        console.log(`No user found with ID: ${req.user.id}`);
        return res.status(404).send('User not found');
    }

    const validPassword = await auth.comparePassword(req.body.oldPassword, user.password);
    if (!validPassword) return res.status(400).send('Old password is incorrect');

    const hashedPassword = await auth.hashPassword(req.body.newPassword);

    user.password = hashedPassword;
    await user.save();

    res.send('Password updated successfully');
};

exports.sendFriendRequest = async (req, res) => {
    try {
        const senderId = req.user.id;
        const receiverId = req.params.userId;

        if (senderId === receiverId) {
            return res.status(400).send('Cannot send friend request to yourself');
        }

        const sender = await User.findById(senderId);
        const receiver = await User.findById(receiverId);

        if (!sender || !receiver) {
            return res.status(404).send('Sender or receiver not found');
        }

        if (sender.friends.includes(receiverId)) {
            return res.status(400).send('You are already friends');
        }

        if (sender.friendRequestsSent.includes(receiverId) || receiver.friendRequestsReceived.includes(senderId)) {
            return res.status(400).send('Friend request already sent or received');
        }

        sender.friendRequestsSent.push(receiverId);
        receiver.friendRequestsReceived.push(senderId);

        await sender.save();
        await receiver.save();

        res.status(200).send('Friend request sent successfully');
    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getFriendRequests = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).populate('friendRequestsReceived', '_id username');
        res.json(user.friendRequestsReceived);
    } catch (error) {
        console.error('Error fetching friend requests:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.acceptFriendRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const senderId = req.body.senderId;

        const user = await User.findById(userId);
        const sender = await User.findById(senderId);

        if (!user || !sender) {
            return res.status(404).send('User or sender not found');
        }

        user.friends.push(senderId);
        sender.friends.push(userId);

        user.friendRequestsReceived = user.friendRequestsReceived.filter(id => id.toString() !== senderId);
        sender.friendRequestsSent = sender.friendRequestsSent.filter(id => id.toString() !== userId);

        await user.save();
        await sender.save();

        res.status(200).send('Friend request accepted');
    } catch (error) {
        console.error('Error accepting friend request:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.rejectFriendRequest = async (req, res) => {
    try {
        const userId = req.user.id;
        const senderId = req.body.senderId;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        user.friendRequestsReceived = user.friendRequestsReceived.filter(id => id.toString() !== senderId);

        await user.save();

        res.status(200).send('Friend request rejected');
    } catch (error) {
        console.error('Error rejecting friend request:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getUserFriends = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found.');
        }

        const friends = await User.find({ _id: { $in: user.friends } }, 'username');
        res.json(friends);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error.');
    }
};

exports.deleteFriend = async (req, res) => {
    try {
        const friendId = req.body.friendId;

        const userId = req.user.id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        if (!user.friends.includes(friendId)) {
            return res.status(400).send('User is not your friend');
        }

        user.friends = user.friends.filter(id => id.toString() !== friendId);
        await user.save();

        const friendUser = await User.findByIdAndUpdate(friendId, { $pull: { friends: userId } }, { new: true });
        if (!friendUser) {
            return res.status(404).send('Friend not found');
        }

        res.status(200).send('Friend deleted successfully');
    } catch (error) {
        console.error('Error deleting friend:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, '-password');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


// ---------------Jobs-----------------------------

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}).populate('employer');

        console.log('Populated jobs:', jobs);

        const updatedJobs = await Promise.all(jobs.map(async job => {
            if (job.employer) {
                job.employer = job.employer.companyName;
            }
            return job;
        }));

        res.json(updatedJobs);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.applyForJob = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send('Job not found');
        }

        const isAlreadyApplied = job.applicants.some(applicant => applicant.applicant.toString() === userId);
        if (isAlreadyApplied) {
            return res.status(400).send('You have already applied for this job');
        }

        job.applicants.push({
            applicant: userId,
            status: 'pending'
        });

        await job.save();

        res.status(200).send('Job application submitted successfully');
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.deleteJobApplication = async (req, res) => {
    try {
        const jobId = req.params.jobId;
        const userId = req.user.id;

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).send('Job not found');
        }

        const index = job.applicants.findIndex(applicant => applicant.applicant.toString() === userId);
        if (index === -1) {
            return res.status(404).send('You have not applied for this job');
        }

        job.applicants.splice(index, 1);
        await job.save();

        res.status(200).send('Job application deleted successfully');
    } catch (error) {
        console.error('Error deleting job application:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.getAppliedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const appliedJobs = await Job.find({
            'applicants.applicant': userId,
            'applicants.status': 'pending'
        }).populate('employer', 'username');

        res.json(appliedJobs);
    } catch (error) {
        console.error('Error fetching applied jobs:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getAcceptedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const acceptedJobs = await Job.find({
            'applicants.applicant': userId,
            'applicants.status': 'accepted'
        }).populate('employer', 'username');

        res.json(acceptedJobs);
    } catch (error) {
        console.error('Error fetching accepted jobs:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getRejectedJobs = async (req, res) => {
    try {
        const userId = req.user.id;

        const rejectedJobs = await Job.find({
            'applicants.applicant': userId,
            'applicants.status': 'rejected'
        }).populate('employer', 'username');

        res.json(rejectedJobs);
    } catch (error) {
        console.error('Error fetching rejected jobs:', error);
        res.status(500).send('Internal Server Error');
    }
};


//--------------course------------------

exports.enrollCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).send('User is already enrolled in this course');
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).send('Enrolled in course successfully');
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('enrolledCourses', {});
        res.json(user.enrolledCourses);
    } catch (error) {
        console.error('Error fetching enrolled courses:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getNotEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const notEnrolledCourses = await Course.find({ _id: { $nin: req.user.enrolledCourses } }, 'title');
        res.json(notEnrolledCourses);
    } catch (error) {
        console.error('Error fetching not enrolled courses:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.markCourseContent = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;
        const topicIndex = req.body.topicIndex;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send('Course not found');
        }

        if (topicIndex < 0 || topicIndex >= course.content.length) {
            return res.status(400).send('Invalid topic index');
        }

        course.content[topicIndex].completed = true;

        await course.save();

        res.status(200).send('Course content marked as completed successfully');
    } catch (error) {
        console.error('Error marking course content as completed:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.viewAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).populate('institute', 'name');
        res.json(courses);
    } catch (error) {
        console.error('Error fetching all courses:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.viewUserEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId).populate('enrolledCourses', 'title');
        res.json(user.enrolledCourses);
    } catch (error) {
        console.error('Error fetching user enrolled courses:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.viewUserEnrolledCourseById = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.courseId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send('Course not found');
        }

        if (!user.enrolledCourses.includes(courseId)) {
            return res.status(400).send('User is not enrolled in this course');
        }

        res.json(course);
    } catch (error) {
        console.error('Error fetching user enrolled course details:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.enrollToCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).send('User is already enrolled in this course');
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).send('Enrolled in course successfully');
    } catch (error) {
        console.error('Error enrolling in course:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.updateCourseProgress = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;
        const progress = req.body.progress;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).send('Course not found');
        }

        const user = await User.findById(userId);
        if (!user || !user.enrolledCourses.includes(courseId)) {
            return res.status(403).send('User is not enrolled in this course');
        }

        progress.forEach(index => {
            if (index >= 0 && index < course.content.length) {
                if (!course.content[index].completed) {
                    course.content[index].completed = true;
                }
            }
        });

        const isCourseCompleted = course.content.every(topic => topic.completed);

        course.completed = isCourseCompleted;

        await course.save();

        res.status(200).send('Course progress updated successfully');
    } catch (error) {
        console.error('Error updating course progress:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.unenrollFromCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.enrolledCourses = user.enrolledCourses.filter(id => id.toString() !== courseId);
        await user.save();

        res.status(200).send('Unenrolled from course successfully');
    } catch (error) {
        console.error('Error unenrolling from course:', error);
        res.status(500).send('Internal Server Error');
    }
};



// ---------------Kuppi----------------
exports.postKuppi = async (req, res) => {
    try {
        const {author, category, topic, description, type } = req.body;
        const newKuppi = new Kuppi({
            category,
            topic,
            description,
            type,
            author
        });
        await newKuppi.save();
        res.status(201).json(newKuppi);
    } catch (error) {
        console.error('Error posting Kuppi:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.likeKuppi = async (req, res) => {
    try {
        const kuppiId = req.params.kuppiId;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).send('User not found');

        const kuppi = await Kuppi.findById(kuppiId);
        if (!kuppi) return res.status(404).send('Kuppi not found');

        if (kuppi.likes.includes(user._id)) {
            return res.status(400).send('You have already liked this kuppi');
        }

        kuppi.likes.push(user._id);
        await kuppi.save();

        res.status(200).send('Kuppi liked successfully');
    } catch (error) {
        console.error('Error liking kuppi:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getKuppi = async (req, res) => {
    try {
        const kuppiId = req.params.kuppiId;
        const kuppi = await Kuppi.findById(kuppiId).populate('author', 'username');
        if (!kuppi) return res.status(404).send('Kuppi not found');
        res.json(kuppi);
    } catch (error) {
        console.error('Error fetching kuppi:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getKuppies = async (req, res) => {
    try {
        const kuppies = await Kuppi.find();
        res.json(kuppies);
    } catch (error) {
        console.error('Error fetching Kuppies:', error);
        res.status(500).json({ message: 'Error fetching Kuppies' });
    }
};


exports.updateKuppi = async (req, res) => {
    const kuppiId = req.params.kuppiId;
    const { category, topic, description } = req.body;

    try {
        const kuppi = await Kuppi.findById(kuppiId);
        if (!kuppi) {
            return res.status(404).json({ message: 'Kuppi post not found' });
        }

        if (kuppi.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this Kuppi post' });
        }

        kuppi.category = category;
        kuppi.topic = topic;
        kuppi.description = description;

        await kuppi.save();

        res.status(200).json({ message: 'Kuppi post updated successfully', kuppi });
    } catch (error) {
        console.error('Error updating Kuppi post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.deleteKuppi = async (req, res) => {
    const kuppiId = req.params.kuppiId;

    try {
        const kuppi = await Kuppi.findById(kuppiId);
        if (!kuppi) {
            return res.status(404).json({ message: 'Kuppi post not found' });
        }

        if (kuppi.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to delete this Kuppi post' });
        }

        await Kuppi.deleteOne({ _id: kuppiId });

        res.status(200).json({ message: 'Kuppi post deleted successfully' });
    } catch (error) {
        console.error('Error deleting Kuppi post:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};











//---------------Consultant----------------

exports.getAllConsultants = async (req, res) => {
    try {
        const consultants = await Consultant.find();
        res.json(consultants);
    } catch (error) {
        console.error('Error fetching consultants:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getConsultantById = async (req, res) => {
    const consultantId = req.params.consultantId;
    try {
        const consultant = await Consultant.findById(consultantId);
        if (!consultant) {
            return res.status(404).send('Consultant not found');
        }
        res.json(consultant);
    } catch (error) {
        console.error('Error fetching consultant:', error);
        res.status(500).send('Internal Server Error');
    }
};


exports.sendSlotRequest = async (req, res) => {
    const userId = req.user.id;
    const { details, message } = req.body;
    const consultantId = req.params.consultantId;

    try {
        const consultant = await Consultant.findById(consultantId);
        if (!consultant) {
            return res.status(404).send('Consultant not found');
        }

        consultant.slotReq.push({
            userId: userId,
            details: details,
            message: message
        });

        await consultant.save();

        res.status(200).send('Slot request sent successfully');
    } catch (error) {
        console.error('Error sending slot request:', error);
        res.status(500).send('Internal Server Error');
    }
};



exports.getAcceptedRequestsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const consultants = await Consultant.find({});

        let acceptedRequests = [];

        for (const consultant of consultants) {
            if (consultant.acceptedReq.includes(userId)) {
                acceptedRequests.push(consultant._id);
            }
        }

        res.status(200).json(acceptedRequests);
    } catch (error) {
        console.error('Error fetching accepted requests:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getRejectedRequestsForUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const consultants = await Consultant.find({});

        let rejectedRequests = [];

        for (const consultant of consultants) {
            if (consultant.rejectedReq.includes(userId)) {
                rejectedRequests.push(consultant._id);
            }
        }

        res.status(200).json(rejectedRequests);
    } catch (error) {
        console.error('Error fetching rejected requests:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getSlotRequestsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        const consultants = await Consultant.find({});

        let slotRequests = [];

        for (const consultant of consultants) {
            const consultantSlotRequests = consultant.slots.filter(slot => slot.slotReq.includes(userId));

            if (consultantSlotRequests.length > 0) {
                slotRequests.push({
                    consultantId: consultant._id,
                    consultantName: `${consultant.firstName} ${consultant.lastName}`,
                    requests: consultantSlotRequests
                });
            }
        }

        res.status(200).json(slotRequests);
    } catch (error) {
        console.error('Error fetching slot requests:', error);
        res.status(500).send('Internal Server Error');
    }
};
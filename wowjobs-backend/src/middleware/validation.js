const Joi = require('joi');

exports.validateUserRegistration = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        email: Joi.string().email().required(),
        profile: Joi.object({
            firstName: Joi.string().max(30),
            lastName: Joi.string().max(30),
            title: Joi.string().max(30),
            company: Joi.string().max(30),
            location: Joi.string().max(30),
            bio: Joi.string().max(500),
            education: Joi.array().items(Joi.object({
                institution: Joi.string().max(30),
                degree: Joi.string().max(30),
                fieldOfStudy: Joi.string().max(30),
                startYear: Joi.number().integer().min(1900).max(2099),
                endYear: Joi.number().integer().min(1900).max(2099)
            })),
            workExperience: Joi.array().items(Joi.object({
                company: Joi.string().max(30),
                title: Joi.string().max(30),
                location: Joi.string().max(30),
                startYear: Joi.number().integer().min(1900).max(2099),
                endYear: Joi.number().integer().min(1900).max(2099),
                description: Joi.string().max(500)
            })),
            skills: Joi.array().items(Joi.string().max(30))
        }),
        contact: Joi.object({
            phone: Joi.string().max(15),
            address: Joi.string().max(50),
            linkedIn: Joi.string().uri(),
            twitter: Joi.string().uri()
        }),
        userType: Joi.string().valid('user', 'company', 'institute', 'admin')
    });
    return schema.validate(data);
};

exports.validateUserLogin = (data) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });
    return schema.validate(data);
};

exports.validatePostCreation = (data) => {
    const schema = Joi.object({
        content: Joi.string().required(),
        title: Joi.string().max(30),
        tags: Joi.array().items(Joi.string().max(30))
    });
    return schema.validate(data);
};

exports.validateJobCreation = (data) => {
    const schema = Joi.object({
        employer: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        requirements: Joi.array().items(Joi.string()),
        applicationInstructions: Joi.string(),
        location: Joi.string(),
        industry: Joi.string(),
        jobType: Joi.string()
    });
    return schema.validate(data);
};

exports.validateEventCreation = (data) => {
    const schema = Joi.object({
        organizer: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string(),
        date: Joi.date().required()
    });
    return schema.validate(data);
};

exports.validateConnectionCreation = (data) => {
    const schema = Joi.object({
        user1: Joi.string().required(),
        user2: Joi.string().required()
    });
    return schema.validate(data);
};


exports.validateCompany = (data) => {
    const schema = Joi.object({
        companyName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        profile: Joi.object({
            description: Joi.string(),
            location: Joi.string(),
            industry: Joi.string(),
            companySize: Joi.number().integer(),
            websiteUrl: Joi.string().uri()
        }),
        contact: Joi.object({
            phone: Joi.string(),
            address: Joi.string(),
            linkedIn: Joi.string().uri(),
            twitter: Joi.string().uri()
        }),
        userType: Joi.string().valid('user', 'company', 'institute', 'admin').required()
    });
    return schema.validate(data);
};

exports.validateCompanyProfileUpdate = (data) => {
    const schema = Joi.object({
        description: Joi.string().max(255),
        location: Joi.string().max(100),
        industry: Joi.string().max(100),
        companySize: Joi.number().integer().min(1),
        websiteUrl: Joi.string().uri()
    });
    return schema.validate(data);
};

exports.validateAdminRegistration = (data) => {
    const schema = Joi.object({
        adminName: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required(),
        userType: Joi.string().valid('user', 'company', 'institute', 'admin')
    });
    return schema.validate(data);
};


exports.validateAdminLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).max(30).required(),
    });
    return schema.validate(data);
};

exports.validateInstitute = (data) => {
    const schema = Joi.object({
        instituteName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        profile: Joi.object({
            description: Joi.string().max(255),
            location: Joi.string().max(100),
            websiteUrl: Joi.string().uri()
        })
    });
    return schema.validate(data);
};

exports.validateInstituteLogin = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    });
    return schema.validate(data);
};

exports.validateCourseCreation = (data) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        syllabus: Joi.string().required(),
        enrollmentCriteria: Joi.string().required()
    });
    return schema.validate(data);
};

exports.validatePasswordChange = (data) => {
    const schema = Joi.object({
        oldPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        newPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });
    return schema.validate(data);
};

exports.validateConsultantRegistration = (data) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        profile: Joi.object({
            bio: Joi.string().max(255),
            expertise: Joi.array().items(Joi.string()),
            experience: Joi.array().items(Joi.object({
                company: Joi.string(),
                position: Joi.string(),
                duration: Joi.string()
            }))
        })
    });
    return schema.validate(data);
};

exports.validateConsultantUpdate = (data) => {
    const schema = Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        profile: Joi.object({
            bio: Joi.string().max(255),
            expertise: Joi.array().items(Joi.string()),
            experience: Joi.array().items(Joi.object({
                company: Joi.string(),
                position: Joi.string(),
                duration: Joi.string()
            }))
        })
    });
    return schema.validate(data);
};

exports.validateKuppi = (data) => {
    const schema = Joi.object({
        author: Joi.string().required(),
        type: Joi.string().valid('question', 'solution').required(),
        category: Joi.string().required(),
        topic: Joi.string().required(),
        description: Joi.string().required()
    });
    return schema.validate(data);
};
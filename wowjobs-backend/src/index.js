const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const jobRoutes = require('./routes/jobRoutes');
const eventRoutes = require('./routes/eventRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const companyRoutes = require('./routes/companyRoutes');
const adminRoutes = require('./routes/adminRoutes');
const fileUploadRouter = require('./routes/fileUploadRouter');
const consultRoutes = require('./routes/consultantRoutes');

const app = express();
require('dotenv').config();
const cors = require('cors');

app.use(cors(
    {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

const db = process.env.MONGODB_URI;

mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB successfully connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/files', fileUploadRouter);
app.use('/api/consultants', consultRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const port = process.env.PORT || 8070;

app.listen(port, () => console.log(`Server up and running on port ${port}!`));

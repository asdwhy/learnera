const express = require('express');
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const config = require('config');
const app = express();

// Allows CORS requests from CORS_ORIGIN
if(process.env.NODE_ENV === "production") {
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', config.get("CORS_ORIGIN"));
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        next();
    });
}

// Content-Type: application/json
app.use(express.json());

app.use ((error, req, res, next) => {
    //Catch json parsing error
    const errorHandler = require('./services/ErrorHandler');

    errorHandler.sendJsonError(res);
});

// Parse cookies using cookie parser
app.use(cookieParser());

// Routes
var userRoutes = require('./routes/user/user-routes');
app.use("/api/user", userRoutes);

var threadRoutes = require('./routes/threads/thread-routes');
app.use("/api/thread", threadRoutes);

var messageRoutes = require('./routes/messages/message-routes');
app.use("/api/message", messageRoutes);

var commentRoutes = require('./routes/comments/comment-routes');
app.use("/api/comment", commentRoutes);

var videoRoutes = require('./routes/videos/video-routes');
app.use("/api/video", videoRoutes);

var likeRoutes = require('./routes/likes/like-routes');
app.use("/api/like", likeRoutes);

var conferenceRoutes = require('./routes/conferences/conference-routes');
app.use("/api/conference", conferenceRoutes);

var companyRoutes = require('./routes/company/company-routes');
app.use("/api/company", companyRoutes);

// Connects to database located at MONGO_CONFIG
mongoose.connect(config.get('MONGO_CONFIG'), { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

// Listens to requests on PORT
const PORT = config.get('PORT') || process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server started on port ' + PORT));


const Post = require('../models/postModel');
const User = require('../models/userModel');
const auth = require('../middleware/auth');
const validation = require('../middleware/validation');

exports.createPost = async (req, res) => {
    try {
        const { error } = validation.validatePostCreation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const userId = req.user && req.user.id;
        console.log('User ID:', userId);

        if (!userId) return res.status(401).send('Unauthorized: User not authenticated');

        const post = new Post({
            author: userId,
            content: req.body.content,
            title: req.body.title,
            tags: req.body.tags
        });

        const savedPost = await post.save();

        res.status(201).json({ post: savedPost });
    } catch (err) {
        console.error('Error creating post:', err);
        res.status(500).send('Internal Server Error');
    }
};



exports.viewPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (err) {
        console.error('Error fetching posts:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.updatePost = async (req, res) => {
    try {
        const { error } = validation.validatePostCreation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });

        if (!updatedPost) return res.status(404).send('Post not found');

        res.send(updatedPost);
    } catch (err) {
        console.error('Error updating post:', err);
        res.status(500).send('Internal Server Error');
    }
};

exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.postId);

        if (!deletedPost) return res.status(404).send('Post not found');

        res.send('Post deleted');
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).send('Internal Server Error');
    }
};



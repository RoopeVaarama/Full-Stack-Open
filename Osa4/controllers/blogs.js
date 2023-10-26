const Blog = require('../models/blog');
const User = require('../models/user');
const blogRouter = require('express').Router();

blogRouter.get('/', async (request, response) => {
    console.log('testis:', request.method);
    const blogs = await Blog.find({}).populate('user', {
        username: 1,
        name: 1,
    });
    console.log('blogs:', blogs);
    response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
    const { body, user } = request;
    console.log(user);

    if (!user) {
        return response.status(401).json({ error: 'user missing' });
    }

    if (!body.title || !body.author || !body.url) {
        return response.status(400).json({ error: 'content missing' });
    } else {
        const userInfo = await User.findById(user);
        console.log('user:', userInfo, userInfo._id);
        const blog = new Blog({ ...body, user: userInfo._id });
        console.log('testis:', request.method);

        const savedBlog = await blog.save();

        userInfo.blogs = userInfo.blogs.concat(savedBlog._id);
        await userInfo.save();

        console.log('blog saved!', savedBlog);
        response.status(201).json(savedBlog);
    }
});

blogRouter.delete('/:id', async (request, response, next) => {
    const { params, user } = request;

    if (!user) {
        return response.status(401).json({ error: 'user missing' });
    }

    const blog = await Blog.findById(params.id).then((res) => res.toJSON());
    console.log('blog:', blog, 'user:', user);

    if (blog.user.toString() !== user) {
        return response.status(401).json({ error: 'wrong user' });
    } else {
        Blog.findByIdAndRemove(params.id)
            .then(() => {
                response.status(204).end();
            })
            .catch((error) => {
                next(error);
            });
    }
});

blogRouter.put('/:id', (request, response, next) => {
    console.log('testis:', request.method);
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    };

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then((updatedBlog) => {
            response.status(200).json(updatedBlog);
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = blogRouter;

const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const api = supertest(app);

const initBlogs = [
    {
        _id: '64dcca18053380ec7340ba4d',
        title: 'test',
        author: 'tester',
        url: 'test.fi',
        likes: 1,
        user: '650ae91d575c5feaa6f7b6c7',
        __v: 0,
    },
    {
        _id: '64c7f073fa64e3bdddd22fa1',
        title: 'test2',
        author: 'tester2',
        url: 'test2.fi',
        likes: 2,
        user: '650ae91d575c5feaa6f7b6c7',
        __v: 0,
    },
];

const initUsers = [
    {
        _id: '650ae91d575c5feaa6f7b6c7',
        username: 'test',
        name: 'test',
        passwordHash:
            '$2b$10$s12ZGhtfKvad84eWEi4s3OqKHcYFeoVOkRv2cYK9g/3I4qN6uWUzu',
    },
];

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(initBlogs[1]);
    await blogObject.save();

    await User.deleteMany({});

    let userObject = new User(initUsers[0]);
    await userObject.save();
});

describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
        const res = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        console.log('res.body:', res);
    });

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(2);
    });

    test('The unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body[0].id).toBeDefined();
    });
});

describe('addition of a new blog', () => {
    test('a valid blog can be added ', async () => {
        const login = await api.post('/api/login').send({
            username: 'test',
            password: 'test',
        });

        const previousBlogs = await api.get('/api/blogs');
        const newBlog = {
            title: 'testi',
            author: 'testaaja',
            url: 'testi.fi',
            likes: 1,
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogs = await api.get('/api/blogs');

        const contents = blogs.body.find((r) => {
            return r.title === newBlog.title && r.author === newBlog.author;
        });
        console.log('contents:', contents);
        expect(contents.toString()).toContain(newBlog.toString());
        expect(blogs.body).toHaveLength(previousBlogs.body.length + 1);
    });

    test('if likes property is missing from the request, it will default to the value 0', async () => {
        const login = await api.post('/api/login').send({
            username: 'test',
            password: 'test',
        });

        const newBlog = {
            title: 'testi2',
            author: 'testaaja2',
            url: 'testi2.fi',
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogs = await api.get('/api/blogs');

        const contents = blogs.body.find((r) => {
            return r.title === newBlog.title && r.author === newBlog.author;
        });
        console.log('contents:', contents);
        expect(contents.likes).toBe(0);
    });

    test('if title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
        const login = await api.post('/api/login').send({
            username: 'test',
            password: 'test',
        });

        const newBlog = {
            author: 'testaaja3',
            likes: 3,
        };

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(newBlog)
            .expect(400);
    });
});

describe('viewing a specific blog', () => {
    test('a blog can be deleted', async () => {
        const login = await api.post('/api/login').send({
            username: 'test',
            password: 'test',
        });

        const previousBlogs = await api.get('/api/blogs');
        const blogToDelete = previousBlogs.body[0];

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${login.body.token}`)
            .expect(204);
    });

    test('a blog can be updated', async () => {
        const previousBlogs = await api.get('/api/blogs');
        const blogToUpdate = previousBlogs.body[0];

        const updatedBlog = {
            title: 'testi3',
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: blogToUpdate.likes,
        };

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200);
    });
});

describe('addition of a new blog fails without token', () => {
    test('a valid blog without token fails ', async () => {
        const newBlog = {
            title: 'testi',
            author: 'testaaja',
            url: 'testi.fi',
            likes: 1,
        };

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

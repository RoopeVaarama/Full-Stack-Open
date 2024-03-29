const listHelper = require('../utils/list_helper');
const blogs = require('../test-support/blogs');

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0,
        },
    ];

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test('when list has many blogs equals the likes of that', () => {
        const result = listHelper.totalLikes(blogs);
        expect(result).toBe(36);
    });
});

describe('favorite blog', () => {
    test('what is the favorite blog of all', () => {
        const result = listHelper.favoriteBlog(blogs);
        console.log(result);
        expect(result).toEqual(blogs[2]);
    });
});

describe('most blogs', () => {
    test('what is the author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs);
        console.log(result);
        expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
    });
});

describe('most likes', () => {
    test('what is the author with most likes', () => {
        const result = listHelper.mostLikes(blogs);
        console.log(result);
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
    });
});

const dummy = (blogs) => {
    return blogs ? 1 : 1;
};

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0;
    }
    const reducer = (sum, item) => {
        return sum + item.likes;
    };

    return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {};
    }
    const reducer = (max, item) => {
        return max.likes > item.likes ? max : item;
    };

    return blogs.reduce(reducer, 0);
};

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {};
    } else {
        let authorCount = blogs.reduce((acc, blog) => {
            acc[blog.author] = (acc[blog.author] || 0) + 1;
            return acc;
        }, {});
        let max = Math.max(...Object.values(authorCount));
        let author = Object.keys(authorCount).find(
            (key) => authorCount[key] === max,
        );
        return { author: author, blogs: max };
    }
};
const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return {};
    } else {
        let authorCount = blogs.reduce((acc, blog) => {
            acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
            return acc;
        }, {});
        let max = Math.max(...Object.values(authorCount));
        let author = Object.keys(authorCount).find(
            (key) => authorCount[key] === max,
        );
        return { author: author, likes: max };
    }
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};

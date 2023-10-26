import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const like = () => {
    console.log('liking blog', blog.title)
    updateBlog(blog.id, {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    })
  }

  console.log('blog', blog, user)
  const usersBlog = blog.user?.username === user.username
  console.log('usersBlog', usersBlog)

  const deleteBlogs = () => {
    console.log('deleting blog', blog.title)
    deleteBlog(blog.id)
  }

  return (
    <li style={blogStyle}>
      <span>
        {' '}
        {blog.title} {blog.author}
      </span>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails ? (
        <div>
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={() => like()}>like</button>
          <br />
          {blog.user?.name}
          {usersBlog ? (
            <>
              <br />
              <button onClick={() => deleteBlogs()}>remove</button>
            </>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}

export default Blog

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import './App.css'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const blogFormRef = useRef()
  console.log(user)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    const loggedUserJSON = localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addNewBlog = (blogObject) => {
    blogService.createBlog({ ...blogObject }).then((blog) => {
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat({ ...blog, user: { name: user.name } }))
      document.getElementById('createNewBlog').reset()
      setMessage(`A new blog ${blog.title} by ${blog.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const updateBlog = (id, blogObject) => {
    blogService.updateBlog(id, blogObject).then((blog) => {
      setBlogs(
        blogs.map((b) => (b.id === blog.id ? { ...blog, user: b.user } : b)),
      )
    })
  }

  const deleteBlog = (id) => {
    const blog = blogs.find((b) => b.id === id)
    if (
      !window.confirm(
        'Are you sure you want to delete this blog? ' +
          blog.title +
          ' ' +
          blog.author,
      )
    )
      return
    blogService.deleteBlog(id).then(() => {
      setBlogs(blogs.filter((b) => b.id !== id))
    })
  }

  const logout = () => {
    console.log('logging out')
    localStorage.removeItem('user')
    setUser(null)
  }

  if (!user) {
    return <Login message={message} setMessage={setMessage} setUser={setUser} />
  }

  console.log(user)
  return (
    <>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.name} logged in
        <button onClick={() => logout()}>logout</button>
      </p>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <CreateBlog
          createBlog={addNewBlog}
          blogs={blogs}
          setBlogs={setBlogs}
          setMessage={setMessage}
        />
      </Togglable>

      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          marginTop: '5px',
        }}>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))}
      </ul>
    </>
  )
}

export default App

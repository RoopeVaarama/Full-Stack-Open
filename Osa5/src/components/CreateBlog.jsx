const CreateBlog = ({ createBlog }) => {
  const createNewBlog = (event) => {
    event.preventDefault()
    console.log('creating blog', event.target[0].value)
    createBlog({
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
    })
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createNewBlog} id="createNewBlog">
        <div>
          title:
          <input />
        </div>
        <div>
          author:
          <input />
        </div>
        <div>
          url:
          <input />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default CreateBlog

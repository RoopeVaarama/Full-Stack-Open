import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'
import Footer from './components/Footer'
import Courses from './components/Courses'

const App = () => {
  const courses = Courses;

  return(
    <div>
      {courses.map(course =>
      <Course key={course.id} courses={course} />
      )}
       <Footer />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

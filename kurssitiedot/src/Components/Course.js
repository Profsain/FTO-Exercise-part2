import React from "react";  

//Course Component
const Course = ({ courses }) => {

  return (
      <div> 
      {courses.map(course => {
        return (
          <div>
            <h2>{course.name}</h2>
            {course.parts.map(part => 
              <p>{part.name} {part.exercises}</p>
            )}
            <h4>{course.parts.map(part => part.exercises).reduce((prev, curr) => prev + curr)}</h4>
          </div>
        )
      }
      )}
    </div>
  )
}
export default Course
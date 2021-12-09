import React from "react";
import Course from "./Components/Course";
import courses from "./CourseDB";

const App = () => {
  return (
    <div>
      <h1>Kurssitiedot React App</h1>
      <Course courses={courses}/>
    </div>
  )
}
export default App;
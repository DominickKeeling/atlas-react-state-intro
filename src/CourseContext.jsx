import React, { useConntext, useState, createContext, useContext } from 'react';

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);

  function enrollCourse(course) {
    console.log("Attempting to enroll course:", course);

    const courseExists = courses.find((exist) => exist.courseNumber === course.courseNumber);

    if (!courseExists) {
      setCourses([...courses, course]);
      console.log("Course added:", course);
    }
  }

  function dropCourse(courseNumber) {
    console.log("Attempting to DROP course:", courseNumber);


    setCourses(courses.filter((course) => course.courseNumber !== courseNumber));
    console.log("Course DROPPED:", courseNumber);

  }

  return (
    <CourseContext.Provider value={{ courses, enrollCourse, dropCourse }}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  return useContext(CourseContext);
}
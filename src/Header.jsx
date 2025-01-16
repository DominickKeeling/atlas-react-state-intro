import logo from "./assets/logo.png";
import React from 'react';
import { useCourseContext } from "./CourseContext";

export default function Header() {
  const { courses } = useCourseContext();

  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">{courses.length}</div>
    </div>
  );
}

import React from 'react';
import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { CourseProvider } from "./CourseContext.jsx";

export default function App() {
  return (
    <CourseProvider>
      <Header />
      <SchoolCatalog />
      <ClassSchedule />
    </CourseProvider>
  );
}

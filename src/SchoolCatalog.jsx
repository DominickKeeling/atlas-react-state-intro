import React, { useEffect, useState } from 'react';
import { useCourseContext } from "./CourseContext.jsx";

export default function SchoolCatalog() {
  const [course, setCourse] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [sortDirection, setDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const { enrollCourse } = useCourseContext();

  useEffect(() => {
    fetch("/api/courses.json")
      .then(response => response.json())
      .then(data => setCourse(data));
  }, []);

  const filteredCourses = course.filter(
    (item) =>
      item.courseNumber.toLowerCase().startsWith(filter.toLowerCase()) ||
      item.courseName.toLowerCase().startsWith(filter.toLowerCase())
  );

  const sortedCourses = filteredCourses.sort((a, b) => {


    if (["courseNumber", "courseName"].includes(sort)) {
      return (
        a[sort].localeCompare(b[sort]) * (sortDirection === "desc" ? -1 : 1)
      );
    }

    if (["trimester", "semesterCredits", "totalClockHours"].includes(sort)) {
      return (
        (parseFloat(a[sort]) - parseFloat(b[sort])) * (sortDirection === "desc" ? -1 : 1)
      );
    }

    return 0;
  });

  let PAGE_SIZE = 5;

  const currentPage = sortedCourses.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hasMore = page * PAGE_SIZE < sortedCourses.length;
  const hasLess = page > 1;

  const handleSort = (field) => {
    const sortOrder = sort === field && sortDirection === "asc" ? "desc" : "asc";
    setSort(field);
    setDirection(sortOrder);
  }

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search"  onChange={(e) => setFilter(e.target.value)}/>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("trimester")}>Trimester</th>
            <th onClick={() => handleSort("courseNumber")}>Course Number</th>
            <th onClick={() => handleSort("courseName")}>Courses Name</th>
            <th onClick={() => handleSort("semesterCredits")}>Semester Credits</th>
            <th onClick={() => handleSort("totalClockHours")}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {currentPage.map((course) => (
            <tr key={course.courseNumber}>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td>
                <button onClick={() => enrollCourse(course)}>
                  Enroll
                </button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

SELECT 
courses.id,
courses.name AS course_name,
courses.department_id, 
departments.name AS department_name 
FROM courses
JOIN departments 
ON courses.department_id = departments.id;
ORDER BY courses.id;

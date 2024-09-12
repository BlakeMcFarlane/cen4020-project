import React from 'react';

const InstructorList = ({ instructors }) => {

  return (
    <div>
      {instructors.map(instructor => (
        <div key={instructor.instructorID}>
          {instructor.firstName} {instructor.lastName} - {instructor.departmentName}
        </div>
      ))}
    </div>
  );
};

export default InstructorList;

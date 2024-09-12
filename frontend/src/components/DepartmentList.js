import React from 'react';

const DepartmentList = ({ departments }) => {

  return (
    <div>
      {departments.map(department => (
        <div key={department.id }>
          {department.departmentName}
        </div>
      ))}
    </div>
  )
};

export default DepartmentList;

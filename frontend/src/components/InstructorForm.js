import React, { useState } from "react";

const InstructorForm = ({ toggleForm, onSave }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);   // Stores object in dashboard
    toggleForm();       // Close the form
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Phone:</label>
        <input
          type="text"
          name="instructorPhone"
          value={formData.instructorPhone}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Department ID:</label>
        <input
          type="text"
          name="departmentID"
          value={formData.departmentID}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Hired Semester:</label>
        <input
          type="text"
          name="hiredSemster"
          value={formData.hiredSemster}
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
    </form>
  );
};

export default InstructorForm;

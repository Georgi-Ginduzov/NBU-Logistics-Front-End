// src/components/employees/EmployeeForm.jsx
import React, { useState } from 'react';

const EmployeeForm = ({
  employeeForm,
  isEditing,
  onInputChange,
  onSubmitForm,
  onCancel,
}) => {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!employeeForm.name) newErrors.name = 'Name is required';
    if (!employeeForm.position) newErrors.position = 'Position is required';
    if (!employeeForm.office) newErrors.office = 'Office ID is required';
    if (!employeeForm.user) newErrors.user = 'User ID is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmitForm();
    }
  };

  return (
    <div>
      <h3>{isEditing ? 'Edit Employee' : 'Create Employee'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={employeeForm.name}
            onChange={onInputChange}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>
        <div>
          <label>Position: </label>
          <input
            type="text"
            name="position"
            value={employeeForm.position}
            onChange={onInputChange}
          />
          {errors.position && <span style={{ color: 'red' }}>{errors.position}</span>}
        </div>
        <div>
          <label>Office ID: </label>
          <input
            type="number"
            name="office"
            value={employeeForm.office || ''}
            onChange={onInputChange}
          />
          {errors.office && <span style={{ color: 'red' }}>{errors.office}</span>}
        </div>
        <div>
          <label>User ID: </label>
          <input
            type="number"
            name="user"
            value={employeeForm.user || ''}
            onChange={onInputChange}
          />
          {errors.user && <span style={{ color: 'red' }}>{errors.user}</span>}
        </div>

        <button type="submit">
          {isEditing ? 'Update' : 'Create'}
        </button>

        {isEditing && <button onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
};

export default EmployeeForm;

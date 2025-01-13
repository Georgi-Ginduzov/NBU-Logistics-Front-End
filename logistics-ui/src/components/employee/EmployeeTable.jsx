// src/components/employees/EmployeeTable.jsx
import React from 'react';

const EmployeeTable = ({ employees, onEditClick, onDeleteClick }) => {
  return (
    <table className="employee-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Office</th>
          <th>User</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.position}</td>
            <td>{emp.office ? emp.office.name : 'No office'}</td>
            <td>{emp.user ? emp.user.username : 'No user'}</td>
            <td>
              <button onClick={() => onEditClick(emp)}>Edit</button>
              <button onClick={() => onDeleteClick(emp.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;

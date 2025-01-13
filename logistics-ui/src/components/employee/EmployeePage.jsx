// src/components/employees/EmployeePage.jsx
import React, { useState, useEffect } from 'react';
import EmployeeTable from '../employee/EmployeeTable';
import EmployeeForm from './EmployeeForm';
import employeeService from '../../services/employeeService';

const EmployeePage = () => {
  // -----------------------------------------
  // 1. State Hooks
  // -----------------------------------------
  const [employees, 
    setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const [employeeForm, setEmployeeForm] = useState({
    id: null,
    name: '',
    position: '',
    office: null,
    user: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  // -----------------------------------------
  // 2. Load Employees on Mount
  // -----------------------------------------
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const response = await employeeService.getAllEmployees();
      if(response.data.length === 0 || response) 
      {
        setErrorMessage('No employees found.');
      }
      const mappedEmployees = response.data.map(emp => ({
        id: emp.id,
        name: emp.name,
        position: emp.position,
        office: emp.office ? emp.office.location : null,
        user: emp.user ? emp.user.username : null,
      }));
      setEmployees(mappedEmployees);
      setLoading(false);
    } catch (error) {
      setErrorMessage('Failed to load employees. Please try again later. Error: ' + error.message + ' ' + error.response.data);
      //console.errorlog(error.response.data);
      setLoading(false);
    }
  };

  // -----------------------------------------
  // 3. Handle Create (POST)
  // -----------------------------------------
  const handleCreate = async () => {
    try {
      await employeeService.createEmployee({
        name: employeeForm.name,
        position: employeeForm.position,
        office: employeeForm.office,
        user: employeeForm.user,
      });
      resetForm();
      loadEmployees();
    } catch (error) {
      setErrorMessage('Failed to create employee. Please try again.');
    }
  };

  // -----------------------------------------
  // 4. Handle Edit
  // -----------------------------------------
  const handleEditClick = (emp) => {
    // Fill the form with existing employee data
    setEmployeeForm({
      id: emp.id,
      name: emp.name,
      position: emp.position,
      office: emp.office, 
      user: emp.user,
    });
    setIsEditing(true);
  };

  const handleUpdate = async () => {
    try {
      await employeeService.updateEmployee(employeeForm.id, {
        name: employeeForm.name,
        position: employeeForm.position,
        office: employeeForm.office,
        user: employeeForm.user,
      });
      resetForm();
      loadEmployees();
    } catch (error) {
      setErrorMessage('Failed to update employee. Please try again.');
    }
  };

  // -----------------------------------------
  // 5. Handle Delete
  // -----------------------------------------
  const handleDeleteClick = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) {
      return;
    }
    try {
      await employeeService.deleteEmployee(id);
      loadEmployees();
    } catch (error) {
      setErrorMessage('Failed to delete employee. Please try again.');
    }
  };

  // -----------------------------------------
  // 6. Form Handlers
  // -----------------------------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitForm = () => {
    if (isEditing) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const resetForm = () => {
    setEmployeeForm({
      id: null,
      name: '',
      position: '',
      office: null,
      user: null,
    });
    setIsEditing(false);
    setErrorMessage('');
  };

  // -----------------------------------------
  // 7. Render
  // -----------------------------------------
  if (loading) {
    return <div>Loading employees...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Employees</h2>

      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}

      {/*  Employee Table  */}
      <EmployeeTable
        employees={employees}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />

      {/*  Employee Form  */}
      <EmployeeForm
        employeeForm={employeeForm}
        isEditing={isEditing}
        onInputChange={handleInputChange}
        onSubmitForm={handleSubmitForm}
        onCancel={resetForm}
      />
    </div>
  );
};

export default EmployeePage;

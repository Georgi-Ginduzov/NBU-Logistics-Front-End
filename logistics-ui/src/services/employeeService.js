import axios from 'axios';

const BASE_URL = 'http://localhost:8080/employees';

const getAllEmployees = () => axios.get(BASE_URL);
const getEmployeeById = (id) => axios.get(`${BASE_URL}/${id}`);
const createEmployee = (data) => axios.post(BASE_URL, data);
const updateEmployee = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
const deleteEmployee = (id) => axios.delete(`${BASE_URL}/${id}`);

const employeeService = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};

export default employeeService;

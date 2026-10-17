import API from './api';

export const registerCompany = async (companyData) => {
  try {
    const response = await API.post('/companies/register', companyData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
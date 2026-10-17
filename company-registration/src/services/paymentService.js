import API from './api';

export const createPaymentOrder = async (amount, currency = 'INR') => {
  try {
    const response = await API.post('/payments/create-order', { amount, currency });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await API.post('/payments/verify', paymentData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
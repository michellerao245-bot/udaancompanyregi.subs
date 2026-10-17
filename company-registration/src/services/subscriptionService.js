import API from './api';

export const getPlans = async () => {
  try {
    const response = await API.get('/subscriptions/plans');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};

export const subscribeToPlan = async (planId, companyId) => {
  try {
    const response = await API.post('/subscriptions/subscribe', { planId, companyId });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : new Error('Network Error');
  }
};
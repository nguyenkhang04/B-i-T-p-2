import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchReminders = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const saveReminder = async (reminder: any) => {
  await axios.post(`${API_URL}`, reminder);
};

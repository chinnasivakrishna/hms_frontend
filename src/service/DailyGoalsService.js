import axios from 'axios';

const DAILY_GOALS_BASE_URL = 'http://localhost:8080/daily-goals';

class DailyGoalsService {
  // Method to save daily goals progress
  saveDailyGoalsProgress(data) {
    return axios.post(DAILY_GOALS_BASE_URL + '/save-progress', data);
  }

  // Method to delete daily goals progress by ID
  deleteDailyGoalsProgress(id) {
    return axios.delete(`${DAILY_GOALS_BASE_URL}/progress/${id}`);
  }

  // Method to update daily goals progress by ID
  updateDailyGoalsProgress(id, data) {
    return axios.put(`${DAILY_GOALS_BASE_URL}/progress/${id}`, data);
  }

  // Method to fetch all daily goals progress
  getAllDailyGoalsProgress() {
    return axios.get(DAILY_GOALS_BASE_URL + '/progress');
  }

  // Add more methods as needed for interacting with the backend
}

export default new DailyGoalsService();

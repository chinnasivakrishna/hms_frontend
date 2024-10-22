import axios from 'axios';

const HEALTH_HISTORY_BASE_URL = 'http://localhost:8080/health-history';

class HealthHistoryService {
  getAllHealthNotes() {
    return axios.get(HEALTH_HISTORY_BASE_URL);
  }

  addHealthNote(newNote) {
    return axios.post(HEALTH_HISTORY_BASE_URL, newNote)
      .then(response => {
        const addedNote = response.data;
        return addedNote; // Return the newly added note
      });
  }

  updateHealthNote(noteId, updatedNote) {
    return axios.put(`${HEALTH_HISTORY_BASE_URL}/${noteId}`, updatedNote);
  }

  deleteHealthNote(noteId) {
    return axios.delete(`${HEALTH_HISTORY_BASE_URL}/${noteId}`);
  }
}

export default new HealthHistoryService();

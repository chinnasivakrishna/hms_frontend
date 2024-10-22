import axios from 'axios';

const PRESCRIPTION_BASE_URL = 'http://localhost:8080/prescriptions';

class PrescriptionService {
  getAllPrescriptions() {
    return axios.get(PRESCRIPTION_BASE_URL);
  }

  addPrescription(newPrescription) {
    return axios.post(PRESCRIPTION_BASE_URL, newPrescription)
      .then(response => {
        const addedPrescription = response.data;
        return addedPrescription; // Return the newly added prescription
      });
  }

  updatePrescription(prescriptionId, updatedPrescription) {
    return axios.put(`${PRESCRIPTION_BASE_URL}/${prescriptionId}`, updatedPrescription);
  }

  deletePrescription(prescriptionId) {
    return axios.delete(`${PRESCRIPTION_BASE_URL}/${prescriptionId}`);
  }

  getPrescriptionsByPatientId(patientId) {
    return axios.get(`${PRESCRIPTION_BASE_URL}/byPatientId/${patientId}`);
}
}

export default new PrescriptionService();

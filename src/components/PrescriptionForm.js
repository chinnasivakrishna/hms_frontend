import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Prescription.css';

function PrescriptionForm({ onSubmit, appointmentId }) {
  const [prescriptionData, setPrescriptionData] = useState({
    doctorId: '',
    patientId: '',
    doctorName: '', // You'll need to set this from the doctor's details
    doctorSpecialization: '', // Same here
    patientName: '',
    patientAge: '',
    patientGender: '',
    diagnosis: '',
    appointmentId:appointmentId,
    medicines: [{ name: '', dosage: '', frequency: '', duration: '' }],
  });

  // Fetch doctor and patient details based on appointmentId
  useEffect(() => {
    if (appointmentId) {
      axios.get(`http://localhost:8080/appointment/patient/${appointmentId}`)
        .then((response) => {
          const patientData = response.data;

          // Set fetched patient data into the form state
          setPrescriptionData((prevData) => ({
            ...prevData,
            patientId: patientData.id,
            patientName: `${patientData.firstName} ${patientData.lastName}`,
            patientAge: calculateAge(patientData.dob),
            patientGender: patientData.gender === 'MALE' ? 'Male' : 'Female',
          }));
        })
        .catch((error) => {
          console.error('Error fetching patient details:', error);
        });

        axios.get(`http://localhost:8080/appointment/doctor/${appointmentId}`)
        .then((response) => {
          const doctorData = response.data;

          // Set fetched patient data into the form state
          setPrescriptionData((prevData) => ({
            ...prevData,
            doctorId: doctorData.id,
            doctorName: `${doctorData.firstName} ${doctorData.lastName}`,
            doctorSpecialization: doctorData.specialization
          }));
        })
        .catch((error) => {
          console.error('Error fetching patient details:', error);
        });
    }
  }, [appointmentId]);

  // Helper function to calculate age from the date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPrescriptionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMedicineChange = (index, e) => {
    const { name, value } = e.target;
    const medicines = [...prescriptionData.medicines];
    medicines[index][name] = value;
    setPrescriptionData((prevData) => ({
      ...prevData,
      medicines,
    }));
  };

  const addMedicine = () => {
    setPrescriptionData((prevData) => ({
      ...prevData,
      medicines: [...prevData.medicines, { name: '', dosage: '', frequency: '', duration: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prescriptionData); // Call onSubmit to pass data to parent component
  };

  return (
    <div className="prescription-form-container">
      <h2>Create Prescription</h2>
      <form onSubmit={handleSubmit}>
        {/* Doctor's Details */}
        <h3>Doctor's Information</h3>
        <label>Doctor's Name:</label>
        <input
          type="text"
          name="doctorName"
          value={prescriptionData.doctorName}
          onChange={handleInputChange}
          required
          readOnly // Make the field readonly
        />
        <label>Specialization:</label>
        <input
          type="text"
          name="doctorSpecialization"
          value={prescriptionData.doctorSpecialization}
          onChange={handleInputChange}
          required
          readOnly
        />

        {/* Patient's Details */}
        <h3>Patient's Information</h3>
        <label>Patient's Name:</label>
        <input
          type="text"
          name="patientName"
          value={prescriptionData.patientName}
          onChange={handleInputChange}
          required
          readOnly // Patient details fetched from API, so make it readonly
        />
        <label>Age:</label>
        <input
          type="number"
          name="patientAge"
          value={prescriptionData.patientAge}
          onChange={handleInputChange}
          required
          readOnly
        />
        <label>Gender:</label>
        <select
          name="patientGender"
          value={prescriptionData.patientGender}
          onChange={handleInputChange}
          required
          disabled // Patient's gender fetched from API, so disable it
        >
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        {/* Diagnosis */}
        <h3>Diagnosis</h3>
        <label>Diagnosis:</label>
        <textarea
          name="diagnosis"
          value={prescriptionData.diagnosis}
          onChange={handleInputChange}
          required
        ></textarea>

        {/* Medicines */}
        <h3>Medicines</h3>
        {prescriptionData.medicines.map((medicine, index) => (
          <div key={index} className="medicine-input-group">
            <label>Medicine Name:</label>
            <input
              type="text"
              name="name"
              value={medicine.name}
              onChange={(e) => handleMedicineChange(index, e)}
              required
            />
            <label>Dosage:</label>
            <input
              type="text"
              name="dosage"
              value={medicine.dosage}
              onChange={(e) => handleMedicineChange(index, e)}
              required
            />
            <label>Frequency:</label>
            <input
              type="text"
              name="frequency"
              value={medicine.frequency}
              onChange={(e) => handleMedicineChange(index, e)}
              required
            />
            <label>Duration:</label>
            <input
              type="text"
              name="duration"
              value={medicine.duration}
              onChange={(e) => handleMedicineChange(index, e)}
              required
            />
          </div>
        ))}

        <button type="button" onClick={addMedicine} className="add-medicine-btn">
          Add Another Medicine
        </button>

        <button type="submit" className="generate-btn">Generate Prescription</button>
      </form>
    </div>
  );
}

export default PrescriptionForm;

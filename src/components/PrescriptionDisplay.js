import React, { useState } from 'react';
import axios from 'axios';
import './Prescription.css';
import logo from '../assets/logo.png';
import html2pdf from 'html2pdf.js'

function PrescriptionDisplay({ prescriptionData }) {
  const [uploadUrl, setUploadUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false); // Loading state for upload
  console.log(prescriptionData)

  // Function to handle PDF generation and upload to Cloudinary
  const handleUploadPdf = async () => {
    const element = document.getElementById('prescription-content');
    const options = {
      margin: 0.5,
      filename: `Prescription_${prescriptionData.patientName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
      setIsUploading(true); // Set uploading state
      const pdfBlob = await html2pdf().from(element).set(options).output('blob'); // Convert to blob

      // Prepare form data for Cloudinary upload
      const formData = new FormData();
      formData.append('file', pdfBlob);
      formData.append('upload_preset', 'post_blog'); // Replace with your actual upload preset

      // Upload PDF to Cloudinary
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dsbuzlxpw/image/upload', // Use image/upload for PDFs
        formData
      );

      // Set the uploaded URL
      const uploadedUrl = response.data.secure_url;
      setUploadUrl(uploadedUrl);

      // Send the data to the Spring Boot backend
      await axios.post('http://localhost:8080/prescriptions', {
        patientName: prescriptionData.patientName,
        doctorName: prescriptionData.doctorName,
        patientId: prescriptionData.patientId,
        doctorId: prescriptionData.doctorId,
        appointmentId: prescriptionData.appointmentId,
        pdfUrl: uploadedUrl,
        date: new Date().toISOString() // Current date in ISO format
      });

      console.log('Data successfully sent to the backend');
    } catch (error) {
      console.error('Error uploading PDF or sending data to the backend:', error.message);
    } finally {
      setIsUploading(false); // Reset uploading state
    }
  };

  return (
    <div className="prescription-container">
      {/* Hospital Logo */}
      

      {/* Prescription Content wrapped inside a div for PDF conversion */}
      <div id="prescription-content">
      <div className="hospital-logo">
        <img src={logo} alt="Hospital Logo" />
      </div>

      <h1>Prescription</h1>
        {/* Doctor Information */}
        <div className="doctor-info">
          <h2>Dr. {prescriptionData.doctorName}</h2>
          <p>Specialization: {prescriptionData.doctorSpecialization}</p>
        </div>

        {/* Patient Information */}
        <div className="patient-info">
          <h3>Patient Information:</h3>
          <p>Name: {prescriptionData.patientName}</p>
          <p>Age: {prescriptionData.patientAge}</p>
          <p>Gender: {prescriptionData.patientGender}</p>
        </div>

        {/* Diagnosis */}
        <div className="diagnosis-info">
          <h3>Diagnosis:</h3>
          <p>{prescriptionData.diagnosis}</p>
        </div>

        {/* Medicines */}
        <div className="medicines-info">
          <h3>Medicines:</h3>
          <ul>
            {prescriptionData.medicines.map((medicine, index) => (
              <li key={index}>
                <p><strong>Medicine:</strong> {medicine.name}</p>
                <p><strong>Dosage:</strong> {medicine.dosage}</p>
                <p><strong>Frequency:</strong> {medicine.frequency}</p>
                <p><strong>Duration:</strong> {medicine.duration}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Upload Button */}
      <button className="upload-btn" onClick={handleUploadPdf} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload to Cloudinary'}
      </button>

      {/* Display the uploaded PDF URL */}
      {uploadUrl && (
        <div className="upload-success">
          <p>PDF Uploaded Successfully!</p>
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">View Uploaded PDF</a>
        </div>
      )}
    </div>
  );
}

export default PrescriptionDisplay;

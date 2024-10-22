import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import PrescriptionForm from './PrescriptionForm';
import PrescriptionDisplay from './PrescriptionDisplay';

function PrescriptionManager() {
    const location = useLocation(); // Access location object
    const [prescriptionData, setPrescriptionData] = useState(null);
    const appointmentId = location.state?.appointmentId; // Get appointmentId from state

    useEffect(() => {
        if (appointmentId) {
            console.log("Appointment ID passed to Prescription Manager:", appointmentId);
            // You can now fetch or use the appointmentId here for further processing if needed
        }
    }, [appointmentId]);

    const handleFormSubmit = (data) => {
        setPrescriptionData(data);
    };

    return (
        <div>
            {!prescriptionData ? (
                <PrescriptionForm onSubmit={handleFormSubmit} appointmentId={appointmentId} /> // Pass the appointmentId to the form if necessary
            ) : (
                <PrescriptionDisplay prescriptionData={prescriptionData} />
            )}
        </div>
    );
}

export default PrescriptionManager;

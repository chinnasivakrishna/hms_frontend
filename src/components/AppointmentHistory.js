import React, { Component } from 'react';
import AppointmentService from '../service/AppointmentService';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import PrescriptionService from '../service/PrescriptionService'; // Import Prescription service

class AppointmentHistory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointments: [],
            message: null
        }

        this.getAllAppointments = this.getAllAppointments.bind(this);
    }

    componentDidMount() {
        this.getAllAppointments();
    }

    getAllAppointments = () => {
        let patient = JSON.parse(sessionStorage.getItem("patient"));
        let patientId = patient.userId;
        console.log(patientId)

        AppointmentService.getAllAppointmentsHistory(patientId)
            .then(response => {
                console.log(response.data);
                this.setState({
                    appointments: response.data,
                    message: "Appointments retrieved successfully"
                })
            })
            .catch(error => {
                console.error("in err ", error.response.data);
                alert(error.response.data.message);
            });
    }

    // Fetch prescription and trigger PDF download if available
    downloadPrescription = (appointmentId) => {
        console.log(appointmentId);
        let patient = JSON.parse(sessionStorage.getItem("patient"));
        let patientId = patient.userId;
    
        PrescriptionService.getPrescriptionsByPatientId(patientId)
            .then(response => {
                if (response.data && response.data.length > 0) {
                    // Filter prescriptions based on appointmentId
                    const matchingPrescription = response.data.find(prescription => prescription.appointmentId == appointmentId);
                    if (matchingPrescription && matchingPrescription.pdfUrl) {
                        const link = document.createElement('a');
                        link.href = matchingPrescription.pdfUrl;
                        link.download = `Prescription_${appointmentId}.pdf`; // Set a name for the downloaded file
                        link.click(); // Trigger the download
                    } else {
                        console.log('No matching prescription found for appointment ID:', appointmentId);
                        alert('No prescription available for this appointment.');
                    }
                } else {
                    console.log('No prescriptions found for patient ID:', patientId);
                    alert('No prescriptions found for this patient.');
                }
            })
            .catch(error => {
                console.error("Error fetching prescriptions:", error);
                alert('Error fetching prescriptions.');
            });
    }
    

    render() {
        return (
            <>
                <div className="container my-4">
                    <button className="btn btn-secondary offset-11" onClick={() => { this.props.history.push('/patientDashboard') }}>Go Back</button>
                    {
                        this.state.appointments.length === 0 ? <h3>You have no appointment history</h3> :
                            <div>
                                <h3>Your Appointment History</h3>
                                <table className="table table-bordered">
                                    <thead className="bg-dark text-light">
                                        <tr>
                                            <th>S. No.</th>
                                            <th>Date</th>
                                            <th>Time</th>
                                            <th>Appointment Type</th>
                                            <th>Actions</th> {/* Updated column name */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.appointments.map(
                                            (appointment, index) =>
                                                <tr key={appointment.id}>
                                                    <td>{`${index + 1}`}</td>
                                                    <td>{moment(Date.parse(appointment.appointmentTime)).format("D MMMM,YYYY")}</td>
                                                    <td>{moment(Date.parse(appointment.appointmentTime)).format("LT")}</td>
                                                    <td>{appointment.appointmentType}</td>
                                                    <td>
                                                        <NavLink className="btn btn-info btn-link text-dark text-decoration-none offset-1 mb-2" to={{ pathname: '/doctor-details-for-patient', state: { appointmentId: appointment.id } }}>Doctor Details</NavLink>
                                                        <button 
                                                            className="btn btn-success m-1" 
                                                            onClick={() => this.downloadPrescription(appointment.id)}>
                                                            View Prescription
                                                        </button>
                                                    </td>
                                                </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </>
        )
    }
}

export default AppointmentHistory;

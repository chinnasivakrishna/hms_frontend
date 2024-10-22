import React, { Component } from 'react';
import AppointmentService from '../service/AppointmentService';
import './patientdashboard.css';

class PatientDetailsForDoctor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patient: {},
            reports: [],
            chat: '', // Add chat to the state
            message: ''
        };

        this.getPatient = this.getPatient.bind(this);
        this.getReports = this.getReports.bind(this);
        this.getAppointment = this.getAppointment.bind(this);
    }

    componentDidMount() {
        this.getPatient();
        this.getReports(); 
        this.getAppointment();
    }

    getPatient = () => {
        const appointmentId = this.props.location.state.appointmentId;
        AppointmentService.getPatientByAppointmentId(appointmentId)
            .then(response => {
                this.setState({
                    patient: response.data,
                    message: "Patient retrieved successfully"
                });
            })
            .catch(error => {
                console.error("Error fetching patient: ", error);
                alert("Error fetching patient data.");
            });
    }

    getReports = () => {
        const appointmentId = this.props.location.state.appointmentId;
        AppointmentService.getReportsByAppointmentId(appointmentId)
            .then(response => {
                this.setState({ reports: response.data });
            })
            .catch(error => {
                console.error("Error fetching reports: ", error);
                alert("Error fetching reports.");
            });
    }

    getAppointment = () => {
        const appointmentId = this.props.location.state.appointmentId;
        AppointmentService.getAppointmentDetails(appointmentId)
            .then(response => {
                this.setState({
                    chat: response.data.chatDescription,
                    message: "Appointment retrieved successfully"
                });
                console.log(response.data.chatDescription);
            })
            .catch(error => {
                console.error("Error fetching appointment: ", error);
                alert("Error fetching appointment data.");
            });
    }

    render() {
        const { patient, reports, chat } = this.state;

        return (
            <div className="container my-4">
                <button className="btn btn-secondary my-3 offset-10" onClick={() => { this.props.history.push('/doctorDashboard') }}>Go Back</button>
                <h3 style={{ textAlign: 'center' }}>Patient Details</h3>
                <div style={{ marginLeft: '300px' }}>
                    <table className="table table-striped table-sm table-bordered" style={{ width: '700px' }}>
                        <tbody>
                            <tr>
                                <td>First Name:</td>
                                <td>{patient.firstName}</td>
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td>{patient.lastName}</td>
                            </tr>
                            <tr>
                                <td>Mobile No:</td>
                                <td>{patient.mobileNumber}</td>
                            </tr>
                            <tr>
                                <td>Date Of Birth:</td>
                                <td>{patient.dob}</td>
                            </tr>
                            <tr>
                                <td>Gender:</td>
                                <td>{patient.gender}</td>
                            </tr>
                            <tr>
                                <td>Blood Group:</td>
                                <td>{patient.bloodGroup}</td>
                            </tr>
                            <tr>
                                <td>Email:</td>
                                <td>{patient.email}</td>
                            </tr>
                            <tr>
                                <td>State:</td>
                                <td>{patient.state}</td>
                            </tr>
                            <tr>
                                <td>Area:</td>
                                <td>{patient.area}</td>
                            </tr>
                            <tr>
                                <td>City:</td>
                                <td>{patient.city}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Display the chat description */}
                <h4 style={{ textAlign: 'center' }}>Chat Description</h4>
                <div style={{ marginLeft: '300px', marginBottom: '20px' }}>
                    <div className="chat-description" style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                        {chat || "No chat information available."}
                    </div>
                </div>

                <h4 style={{ textAlign: 'center' }}>Patient Reports</h4>
                <div style={{ marginLeft: '300px' }}>
                    <table className="table table-striped table-sm table-bordered" style={{ width: '700px' }}>
                        <thead>
                            <tr>
                                <th>Report About</th>
                                <th>Date</th>
                                <th>Report URL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reports.map((report, index) => (
                                <tr key={index}>
                                    <td>{report.reportAbout}</td>
                                    <td>{new Date(report.reportDate).toLocaleDateString()}</td>
                                    <td>
                                        <a href={report.reportUrl} target="_blank" rel="noopener noreferrer">View Report</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default PatientDetailsForDoctor;

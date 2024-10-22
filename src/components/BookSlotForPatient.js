import React, { Component } from 'react';
import AppointmentService from '../service/AppointmentService';
import moment from 'moment';
import axios from 'axios';
import './bookSlots.css';

class BookSlotForPatient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slots: [],
            message: null,
            showReportForm: false,
            reportAbout: '',
            reportDate: '',
            reportFile: null,
            reports: [],
            showChatModal: false,
            chatDescription: '',
        };

        this.confirmSlot = this.confirmSlot.bind(this);
        this.handleAddReports = this.handleAddReports.bind(this);
        this.handleReportSubmit = this.handleReportSubmit.bind(this);
        this.handleChatSave = this.handleChatSave.bind(this); // Add a method to handle chat save
    }

    confirmSlot = async (doctorId, patientId, time) => {
        try {
            const { chatDescription } = this.state;
            console.log(chatDescription)

            const response = await AppointmentService.bookAppointmentForPatient(doctorId, patientId, time.replace("T", " "), chatDescription);
            const appointmentId = response.data; // Assuming response.data contains the appointmentId
            this.setState({ slots: response.data, message: "Appointment Confirmed!!!", appointmentId, chatDescription: '' }); // Clear chat description

            alert(this.state.message);

            // Now iterate over reports and send each one to the backend
            for (const report of this.state.reports) {
                const reportData = {
                    doctorId,
                    patientId,
                    appointmentId,
                    reportAbout: report.reportAbout,
                    reportDate: report.reportDate,
                    reportUrl: report.reportUrl,
                };

                try {
                    await axios.post('http://localhost:8080/api/reports/save', reportData);
                } catch (err) {
                    console.log(err);
                }
            }
            this.props.history.push('/patientDashboard');

        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error);
            alert(error.response ? error.response.data.message : "An error occurred.");
        }
    };

    handleAddReports = () => {
        this.setState({ showReportForm: true });
    }

    handleReportSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('file', this.state.reportFile);
        formData.append('upload_preset', 'post_blog');
    
        try {
            const response = await axios.post('https://api.cloudinary.com/v1_1/dsbuzlxpw/image/upload', formData);
    
            const uploadedUrl = response.data.url;
            const newReport = {
                reportAbout: this.state.reportAbout,
                reportDate: this.state.reportDate,
                reportUrl: uploadedUrl
            };
    
            this.setState(prevState => ({
                reports: [...prevState.reports, newReport]
            }));
    
            alert("Report uploaded successfully!");
        } catch (error) {
            console.error("Error uploading report:", error);
            alert("Error uploading report. Please try again.");
        }
    };

    handleChatSave = () => {
        // Simply close the modal and keep the chatDescription in state
        this.setState({ showChatModal: false });
    }

    render() {
        let { doctor, time } = this.props.location.state;
        let patient = JSON.parse(sessionStorage.getItem("patient"));

        return (
            <>
                <div className="container my-4" style={{ minWidth: '100vw' }}>
                    <button className="btn btn-secondary my-2 offset-10" onClick={() => { this.props.history.push('/patientDashboard') }} style={{ minWidth: "13vw" }}>Back To Dashboard</button>
                    <h3>Confirm Appointment</h3>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-light">
                            <tr>
                                <th className="visually-hidden">Patient ID</th>
                                <th>Patient Name</th>
                                <th>Doctor Name</th>
                                <th>Area</th>
                                <th>Consultation Fee</th>
                                <th>Specialization</th>
                                <th>Time</th>
                                <th>Uploaded Reports</th>
                                <th>Action</th>
                                <th>Chat</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="visually-hidden">{patient.userId}</td>
                                <td>{patient.userFirstName}</td>
                                <td>{`Dr. ${doctor.firstName} ${doctor.lastName}`}</td>
                                <td>{`${doctor.area}, ${doctor.city}`}</td>
                                <td>{doctor.fees}</td>
                                <td>{doctor.specialization}</td>
                                <td>{moment(Date.parse(time)).format("LT")}</td>
                                <td>
                                    {this.state.reports.map((report, index) => (
                                        <div key={index}>
                                            <a href={report.reportUrl} target="_blank" rel="noopener noreferrer">
                                                {report.reportAbout} ({moment(report.reportDate).format("YYYY-MM-DD")})
                                            </a>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <button className="btn btn-success m-3" onClick={() => { this.confirmSlot(doctor.id, patient.userId, time) }}>Confirm</button>
                                    <button className="btn btn-primary m-3" onClick={this.handleAddReports}>Add Report</button>
                                </td>
                                <td>
                                    <button className="btn btn-info m-3" onClick={() => this.setState({ showChatModal: true })}>Chat</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Report form modal */}
                    {this.state.showReportForm && (
                        <div className="overlay">
                            <div className="card">
                                <div className="card-body">
                                    <button className="btn btn-danger close-btn" onClick={() => this.setState({ showReportForm: false })}>X</button>
                                    <h4>Add Report</h4>
                                    <form onSubmit={this.handleReportSubmit}>
                                        <input type="text" placeholder="Report About" required
                                            onChange={e => this.setState({ reportAbout: e.target.value })} />
                                        <input type="date" required
                                            onChange={e => this.setState({ reportDate: e.target.value })} />
                                        <input type="file" required
                                            onChange={e => this.setState({ reportFile: e.target.files[0] })} />
                                        <button type="submit">Upload Report</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Chat modal */}
                    {this.state.showChatModal && (
                        <div className="overlay">
                            <div className="card">
                                <div className="card-body">
                                    <button className="btn btn-danger close-btn" onClick={() => this.setState({ showChatModal: false })}>X</button>
                                    <h4>Chat with Doctor</h4>
                                    <form onSubmit={(e) => { e.preventDefault(); this.handleChatSave(); }}>
                                        <div className="mb-3">
                                            <label htmlFor="chatDescription" className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                id="chatDescription"
                                                value={this.state.chatDescription}
                                                onChange={(e) => this.setState({ chatDescription: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <button type="button" className="btn btn-primary" onClick={this.handleChatSave}>Save</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default BookSlotForPatient;

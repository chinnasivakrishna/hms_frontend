import React, { Component } from 'react';
import AppointmentService from '../service/AppointmentService';
import { NavLink } from 'react-router-dom';
import moment from 'moment';

class DoctorCurrentAppointments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            appointments: [],
            message: null
        }

        this.getCurrentAppointments = this.getCurrentAppointments.bind(this);
        this.cancelAppointment = this.cancelAppointment.bind(this);
    }

    componentDidMount() {
        this.getCurrentAppointments();
    }

    getCurrentAppointments = () => {
        let doctor = JSON.parse(sessionStorage.getItem("doctor"));
        AppointmentService.getCurrentAppointmentsForDoctor(doctor.userId)
            .then(response => {
                console.log(response.data);
                this.setState({
                    appointments: response.data,
                    message: "Appointment list rendered successfully"
                });

            })
            .catch(error => {
                console.error("in err ", error.response.data);
                alert(error.response.data.message);
            });
    }

    cancelAppointment = appointmentId => {
        if (window.confirm("Are you sure you want to cancel this appointment")) {
            console.log(appointmentId)
            AppointmentService.cancelAppointment(appointmentId)
                .then(res => {
                    this.setState({ message: 'Appointment cancelled!!!' });
                    console.log(this.state.message, 'Appointment ID: ', appointmentId);
                    this.setState({ appointments: this.state.appointments.filter(appointment => appointment.id !== appointmentId) });
                })
        } else {
            this.props.history.push("#");
        }
    }

    render() {
        return (
            <>
                <div className="container my-4">
                    <button className="btn btn-secondary offset-11" onClick={() => { this.props.history.push('/doctorDashboard') }}>Go Back</button>
                    {this.state.appointments.length === 0 ? <h3>You have no active appointments</h3> : <div>
                        <h3>Your Active Appointments</h3>
                        <table className="table table-bordered">
                            <thead className="bg-dark text-light">
                                <tr>
                                    <th>S. No.</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Appointment Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.appointments.map(
                                        (appointment, index) =>
                                            <tr key={appointment.id}>
                                                <td>{`${index + 1}`}</td>
                                                <td>{moment(Date.parse(appointment.appointmentTime)).format("D MMMM,YYYY")}</td>
                                                <td>{moment(Date.parse(appointment.appointmentTime)).format("LT")}</td>
                                                <td>{appointment.appointmentType}</td>
                                                <td>
                                                    <NavLink className="btn btn-info btn-link text-dark text-decoration-none " to={{ pathname: '/patient-details-for-doctor', state: { appointmentId: appointment.id } }}>Patient Details</NavLink>
                                                    <button className="btn btn-danger mx-1" onClick={() => { this.cancelAppointment(appointment.id) }}>Cancel</button>
                                                   
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    }
                </div>
            </>
        )
    }
}

export default DoctorCurrentAppointments

import './App.css';
import About from './components/About';
import AddNewDctor from './components/AddNewDoctor';
import AddNewDonor from './components/AddNewDonor';
import AdminDashboard from './components/AdminDashboard';
import AppointmentHistory from './components/AppointmentHistory';
import BookSlotForPatient from './components/BookSlotForPatient';
import Contact from './components/Contact';
import CreateAppointmentSlots from './components/CreateAppointmentSlots';
import DoctorAppointmentHistory from './components/DoctorAppointmentHistory';
import DoctorAppointmentSlots from './components/DoctorAppointmentSlots';
import DoctorCurrentAppointments from './components/DoctorCurrentAppointments';
import DoctorDashboard from './components/DoctorDashboard';
import DoctorDetailsForPatient from './components/DoctorDetailsForPatient';
import DoctorListForAdmin from './components/DoctorListForAdmin';
import DoctorListForPatient from './components/DoctorListForPatient';
import DonorList from './components/DonorList';
import EmailForForgotPassword from './components/EmailForForgotPassword';
import EnterToken from './components/EnterToken';
import Footer from './components/Footer';
import GetDonorsByCityAndBloodGroup from './components/GetDonorsByCityAndBloodGroup';
import Header from './components/Header';
import HealthHistory from './components/HealthHistory';
import LandingPage from './components/LandingPage';
import PatientDashboard from './components/PatientDashboard';
import PatientDetailsForDoctor from './components/PatientDetailsForDoctor';
import PatientList from './components/PatientList';
import PatientSignUp from './components/PatientSignUp';
import PrescriptionDisplay from './components/PrescriptionDisplay';
import PrescriptionManager from './components/PrescriptionManager';
import ResetPassword from './components/ResetPassword';
import ShowAppointmentSlots from './components/ShowAppointmentSlots';
import ShowCurrentAppointment from './components/ShowCurrentAppointment';
import SpecializationListByCity from './components/SpecializationListByCity';
import UpdateDoctorProfile from './components/UpdateDoctorProfile';
import UpdatePatientProfile from './components/UpdatePatientProfile';
import UserLogin from './components/UserLogin';
import DailyGoals from './components/dailygoals';


import {
  Route,
  Switch
} from 'react-router';

function App() {
  return (
    <div className="main">
      <Header title="AskYourDoctor" />
      <Switch>
        <Route exact path="/" component={LandingPage}></Route>
        <Route exact path="/about" component={About}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Route exact path="/patient-sign-up" component={PatientSignUp}></Route>
        <Route exact path="/userLogin" component={UserLogin}></Route>
        <Route exact path="/email-for-forgot-password" component={EmailForForgotPassword}></Route>
        <Route exact path="/enter-token" component={EnterToken}></Route>
        <Route exact path="/reset-password" component={ResetPassword}></Route>
        <Route exact path="/patientDashboard" component={PatientDashboard}></Route>
        <Route exact path="/adminDashboard" component={AdminDashboard}></Route>
        <Route exact path="/doctorDashboard" component={DoctorDashboard}></Route>
        <Route exact path="/health-history" component={HealthHistory}></Route>
        <Route exact path="/prescriptions" component={PrescriptionManager}></Route>
        <Route exact path="/daily-goals" component={DailyGoals}></Route>
        <Route exact path="/specialization-list-by-city" component={SpecializationListByCity}></Route>
        <Route exact path="/current-app" component={ShowCurrentAppointment}></Route>
        <Route exact path="/app-history" component={AppointmentHistory}></Route>
        <Route exact path="/update-profile" component={UpdatePatientProfile}></Route>
        <Route exact path="/doctor-list-patient" component={DoctorListForPatient}></Route>
        <Route exact path="/doctor-list-admin" component={DoctorListForAdmin}></Route>
        <Route exact path="/patientList" component={PatientList}></Route>
        <Route exact path="/add-new-doctor" component={AddNewDctor}></Route>
        <Route exact path="/add-new-donor" component={AddNewDonor}></Route>
        <Route exact path="/donorList" component={DonorList}></Route>
        <Route exact path="/doctor-current-app" component={DoctorCurrentAppointments}></Route>
        <Route exact path="/doctor-app-history" component={DoctorAppointmentHistory}></Route>
        <Route exact path="/doctor-appointment-slots" component={DoctorAppointmentSlots}></Route>
        <Route exact path="/create-appointment-slots" component={CreateAppointmentSlots}></Route>
        <Route exact path="/book-slot-for-patient" component={BookSlotForPatient}></Route>
        <Route exact path="/get-donors-by-city-and-blood-group" component={GetDonorsByCityAndBloodGroup}></Route>
        <Route exact path="/update-doctor-profile" component={UpdateDoctorProfile}></Route>
        <Route exact path="/patient-details-for-doctor" component={PatientDetailsForDoctor}></Route>
        <Route exact path="/show-appointment-slots-doctor" component={ShowAppointmentSlots}></Route>
        <Route exact path="/doctor-details-for-patient" component={DoctorDetailsForPatient}></Route>
        <Route exact path="/template" component={PrescriptionDisplay}></Route>

        {/* <Redirect to="/" /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import HealthHistoryService from '../service/MedicalHistoryService';
import './HealthHistory.css'; // Import CSS file for styling

class HealthHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      healthNotes: [],
      symptoms: '',
      doctorConsulted: '',
      medicineTaken: '',
    };
  }
  handlePrint = () => {
    window.print(); // Trigger print functionality
  };
  componentDidMount() {
    this.fetchHealthNotes();
  }

  fetchHealthNotes = async () => {
    try {
      const response = await HealthHistoryService.getAllHealthNotes();
      this.setState({ healthNotes: response.data });
    } catch (error) {
      console.error('Error fetching health notes:', error);
    }
  };

  addHealthNote = (newNote) => {
    const updatedNotes = [...this.state.healthNotes, newNote];
    this.setState({ healthNotes: updatedNotes });
  };
  

  deleteHealthNote = (noteId) => {
    const updatedNotes = this.state.healthNotes.filter(note => note.id !== noteId);
    this.setState({ healthNotes: updatedNotes });
  };
  

  handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date().toLocaleDateString();
    const { symptoms, doctorConsulted, medicineTaken } = this.state;
    const newNote = { date: today, symptoms, doctorConsulted, medicineTaken };
    this.addHealthNote(newNote);
    this.setState({
      symptoms: '',
      doctorConsulted: '',
      medicineTaken: '',
    });
  };

  render() {
    const { symptoms, doctorConsulted, medicineTaken, healthNotes } = this.state;

    return (
      <div className="health-history-container">
        <h2>Health History</h2>
        <form className="health-note-form" onSubmit={this.handleSubmit}>
          <label htmlFor="symptoms">Symptoms:</label>
          <textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => this.setState({ symptoms: e.target.value })}
            required
          />
          <label htmlFor="doctorConsulted">Doctor Consulted (Optional):</label>
          <input
            type="text"
            id="doctorConsulted"
            value={doctorConsulted}
            onChange={(e) => this.setState({ doctorConsulted: e.target.value })}
          />
          <label htmlFor="medicineTaken">Medicine Taken (Optional):</label>
          <input
            type="text"
            id="medicineTaken"
            value={medicineTaken}
            onChange={(e) => this.setState({ medicineTaken: e.target.value })}
          />
          <button type="submit">Add Note</button>
        
        
        </form>
        <div className="saved-notes">
          <h3>Saved Notes</h3>
          <ul>
            {healthNotes.map((note, index) => (
              <li key={index}>
                <p>Date: {note.date}</p>
                <p>Symptoms: {note.symptoms}</p>
                <p>Doctor Consulted: {note.doctorConsulted || 'N/A'}</p>
                <p>Medicine Taken: {note.medicineTaken || 'N/A'}</p>
                <button onClick={() => this.deleteHealthNote(note.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" onClick={this.handlePrint}>Print</button> {/* Print button */}

      </div>
    );
  }
}

export default HealthHistory;

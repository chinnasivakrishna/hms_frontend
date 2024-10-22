import React, { Component } from 'react';
import './DailyGoals.css'; // Import CSS file for styling
import DailyGoalsService from '../service/DailyGoalsService';

class DailyGoals extends Component {
  constructor(props) {
    super(props);
    // Load saved data from localStorage if available
    const savedData = JSON.parse(localStorage.getItem('dailyGoalsData')) || {
      waterIntake: 0,
      exerciseDuration: 0,
      diet: {
        breakfast: '',
        lunch: '',
        dinner: '',
      },
    };
    this.state = {
      ...savedData,
      savedProgress: null,
    };
  
    // Bind the handleSubmit function
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handlePrint = () => {
    window.print(); // Trigger print functionality
  };

  handleWaterChange = (event) => {
    const newWaterIntake = parseInt(event.target.value) * 500; // Convert cups to ml
    this.setState({ waterIntake: newWaterIntake });
  };

  handleExerciseChange = (event) => {
    this.setState({ exerciseDuration: parseInt(event.target.value) });
  };

  handleDietChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      diet: {
        ...prevState.diet,
        [name]: value,
      },
    }));
  };handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    // Call the service method to save progress
    DailyGoalsService.saveDailyGoalsProgress(this.state)
      .then((response) => {
        // Handle success
        console.log('Progress saved successfully:', response.data);
        // Update the state with saved progress and clear the form fields
        this.setState({
          savedProgress: response.data,
          waterIntake: 0,
          exerciseDuration: 0,
          diet: {
            breakfast: '',
            lunch: '',
            dinner: '',
          },
        });
        // Save data to localStorage
        localStorage.setItem('dailyGoalsData', JSON.stringify(response.data));
      })
      .catch((error) => {
        // Handle error
        console.error('Error saving progress:', error);
      });
  };
  
  
  

  render() {
    const { waterIntake, exerciseDuration, diet, savedProgress } = this.state;

    return (
      <div className="daily-goals-container">
        <h2>Daily Goals</h2>
        <form className="daily-goals-form" onSubmit={this.handleSubmit}>
        
          <div className="goal-section">
            <label htmlFor="waterIntake">
              Water Intake:
              <img src="https://img.freepik.com/premium-vector/glass-with-water-template-glass-transparent-cup-with-blue-refreshing-natural-liquid_79145-1179.jpg" alt="Water Icon" class="icon" />

            </label>
            <input
              type="number"
              id="waterIntake"
              value={waterIntake / 500} // Convert ml to cups for display
              onChange={this.handleWaterChange}
              min="0"
              required
            />
            <span> cups ({waterIntake} ml)</span>
          </div>
          <div className="goal-section">
            <label htmlFor="exerciseDuration">
              Exercise Duration:
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiBrUXI9JeO5frbLUWyIAXe54Q4NNfNbqMsfzku6CvIw&s" alt="Exercise Icon" class="icon" />
            </label>
            <input
              type="number"
              id="exerciseDuration"
              value={exerciseDuration}
              onChange={this.handleExerciseChange}
              min="0"
              required
            />
            <span> minutes</span>
          </div>
          <div className="goal-section">
            <h3>Diet</h3>
            <label htmlFor="breakfast">Breakfast:</label>
            <textarea
              id="breakfast"
              name="breakfast"
              value={diet.breakfast}
              onChange={this.handleDietChange}
              rows="3"
            />
            <label htmlFor="lunch">Lunch:</label>
            <textarea
              id="lunch"
              name="lunch"
              value={diet.lunch}
              onChange={this.handleDietChange}
              rows="3"
            />
            <label htmlFor="dinner">Dinner:</label>
            <textarea
              id="dinner"
              name="dinner"
              value={diet.dinner}
              onChange={this.handleDietChange}
              rows="3"
            />
          </div>
          <button type="submit">Submit</button>
        </form>

        {/* Saved progress section */}
{savedProgress && (
  <div className="saved-progress">
    <h3>Saved Progress</h3>
    <p>Water Intake: {savedProgress.waterIntake} ml</p>
    <p>Exercise Duration: {savedProgress.exerciseDuration} minutes</p>
    <div>
      <h4>Diet</h4>
      <p>Breakfast: {savedProgress.diet.breakfast}</p>
      <p>Lunch: {savedProgress.diet.lunch}</p>
      <p>Dinner: {savedProgress.diet.dinner}</p>
    </div>
  </div>
)}

    </div>
  );
}}

export default DailyGoals;

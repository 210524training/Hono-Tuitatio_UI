import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import M from 'materialize-css';
import "materialize-css/dist/css/materialize.min.css";
import { currentUser, sendReimbursementRequest } from '../../../remote/grubdash-backend/trms.api';
import { useHistory } from 'react-router-dom';

const RequestPage: React.FC<unknown> = (props) => {
 
  let history = useHistory();
  

  const [supervisorId, setSupervisorId] = useState<string>('');
  const [managerId, setManagerId] = useState<string>('');
  const [eventName, setEventName] = useState<string>('');
  const [startDate, setstartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [cost, setCost] = useState<number>(0);
  const [eventType, setEventType] = useState<string>('');

 const today = new Date();
 var minDate = new Date();
 var duration = 7; //In Days
 minDate.setTime(today.getTime() +  (duration * 24 * 60 * 60 * 1000));

  const handleSupervisorIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSupervisorId(e.target.value);
  };

  const handleManagerIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setManagerId(e.target.value);
  };

  const handleEventNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEventName(e.target.value);
  };

  const handlestartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setstartDate(e.target.value);
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCost(parseInt(e.target.value, 0));
  };

  const handleEventTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setEventType(event.currentTarget.value );
  };



  
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = currentUser?  currentUser.id : ""
    const response = await sendReimbursementRequest(
      userId,
      supervisorId,
      managerId,
      eventName,
      eventType,
      startDate,
      endDate,
      cost,
      'Pending'
      );
        if(response) {
          history.push("/home");
        }
  }

  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <div className='container' id='re-imburse-form'>
     <title>Re-imbursement form</title>
      <form onSubmit={handleFormSubmit} >
        <h3>Person Information</h3>
       <br />
        
        <br />
        <div className="reqform">
          <label htmlFor="lastNameInput" className="form-label">Supervisor Id</label>
          <input type="text" className="form-control" id="supervisorIdInput"
            onChange={handleSupervisorIdChange} />
        </div>
        <br />
        <div className="reqform">
          <label htmlFor="managerIdInput" className="form-label">Manager Id</label>
          <input type="text" className="form-control" id="managerId"
            onChange={handleManagerIdChange} />
        </div>
        <h3>Event Details</h3>
    
        <div className="reqform">
          <label htmlFor="eventNameInput" className="form-label">Event Name</label>
          <input type="text" className="form-control" id="eventNameInput"
            onChange={handleEventNameChange} />
        </div>
        <br />

  
        <div className="reqform">
          <label htmlFor="startDateInput" className="form-label">Start Date</label>
          <input type="date"  min={minDate.toISOString().split('T')[0]} defaultValue={minDate.toISOString().split('T')[0]} className="form-control" id="startDateInput"
            onChange={handlestartDateChange} />
        </div>
        <br />
        <div className="reqform">
          <label htmlFor="endDateInput" className="form-label">End Date</label>
          <input type="date" min={minDate.toISOString().split('T')[0]} defaultValue={minDate.toISOString().split('T')[0]} className="form-control"  id="endDateInput"
            onChange={handleEndDateChange} />
        </div>

    
        <br />
        <div className="reqform">
          <label htmlFor="costInput" className="form-label">Cost</label>
          <input type="number" className="form-control" max="1000" id="costInput"
            onChange={handleCostChange} />
        </div>
        <br />
        <div>
            <select id='event_type'  value="" onChange={ e => handleEventTypeChange(e) }  >
            <option value="" disabled selected>Choose Event Type</option>
                <option value = "Course">University Course</option>
                <option value = "Seminar">Seminar</option>
                <option value = "PreCertificate">Pre-Certication</option>
                <option value = "Certificate">Certificate</option>
                <option value = "Training">Training</option>
                <option value = "Other">Other</option>
            </select>
        </div>
        <br />
        <div>
            <select value = "">
            <option value="" disabled selected>Choose Grading Type</option>
                <option>Grading Letters</option>
                <option>Grading Percentages</option>
            </select>
        </div>
        <br />
      
        <br />
        <input type="submit" className="btn btn-primary" value='Submit' />
      </form>
    </div>
  );
};

export default RequestPage;
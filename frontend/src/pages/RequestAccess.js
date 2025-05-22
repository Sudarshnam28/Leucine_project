import React, { useState, useEffect } from 'react';
import './RequestAccess.css';

const RequestAccess = () => {
  const [formData, setFormData] = useState({
    softwareId: '',
    accessType: 'Read',
    reason: ''
  });
  const [softwareList, setSoftwareList] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate fetching software list
    setTimeout(() => {
      setSoftwareList([
        { id: 1, name: 'Accounting App' },
        { id: 2, name: 'Inventory System' },
        { id: 3, name: 'HR Portal' },
        { id: 4, name: 'CRM Software' },
        { id: 5, name: 'Project Management' }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage('Access request submitted successfully!');
      setFormData({
        softwareId: '',
        accessType: 'Read',
        reason: ''
      });
    } catch (err) {
      setMessage('Error submitting request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="request-access-container">
      <div className="page-header">
        <h1>Request Software Access</h1>
        <p>Submit a request to access software applications</p>
      </div>
      
      <div className="form-container">
        {message && (
          <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="softwareId" className="form-label">Software</label>
            {isLoading ? (
              <div className="loading-select">Loading software list...</div>
            ) : (
              <select
                id="softwareId"
                name="softwareId"
                className="form-control"
                value={formData.softwareId}
                onChange={handleChange}
                required
              >
                <option value="">Select software</option>
                {softwareList.map(software => (
                  <option key={software.id} value={software.id}>
                    {software.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="accessType" className="form-label">Access Type</label>
            <select
              id="accessType"
              name="accessType"
              className="form-control"
              value={formData.accessType}
              onChange={handleChange}
              required
            >
              <option value="Read">Read</option>
              <option value="Write">Write</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="reason" className="form-label">Reason for Access</label>
            <textarea
              id="reason"
              name="reason"
              className="form-control"
              rows="4"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Explain why you need access to this software"
              required
            />
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || isLoading}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestAccess;
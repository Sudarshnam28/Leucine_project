import React, { useState } from 'react';
import './CreateSoftware.css';

const CreateSoftware = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    version: '',
    licenseKey: '',
    accessLevels: ['Read', 'Write', 'Admin']
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          accessLevels: [...prev.accessLevels, value]
        };
      } else {
        return {
          ...prev,
          accessLevels: prev.accessLevels.filter(level => level !== value)
        };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage('Software created successfully!');
      setFormData({
        name: '',
        description: '',
        version: '',
        licenseKey: '',
        accessLevels: ['Read', 'Write', 'Admin']
      });
    } catch (err) {
      setMessage('Error creating software. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-software-container">
      <div className="page-header">
        <h1>Create New Software</h1>
        <p>Add a new software to the system</p>
      </div>
      
      <div className="form-container">
        {message && (
          <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Software Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter software name"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter software description"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="version" className="form-label">Version</label>
            <input
              type="text"
              id="version"
              name="version"
              className="form-control"
              value={formData.version}
              onChange={handleChange}
              placeholder="e.g., 1.0.0"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="licenseKey" className="form-label">License Key (Optional)</label>
            <input
              type="text"
              id="licenseKey"
              name="licenseKey"
              className="form-control"
              value={formData.licenseKey}
              onChange={handleChange}
              placeholder="Enter license key if applicable"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Access Levels</label>
            <div className="access-levels">
              {['Read', 'Write', 'Admin'].map(level => (
                <div key={level} className="form-check">
                  <input
                    type="checkbox"
                    id={`access-${level}`}
                    value={level}
                    checked={formData.accessLevels.includes(level)}
                    onChange={handleCheckboxChange}
                    className="form-check-input"
                  />
                  <label htmlFor={`access-${level}`} className="form-check-label">
                    {level}
                  </label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Software'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSoftware;
import React, { useEffect, useState } from 'react';
import './PendingRequests.css';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRequests([
        { 
          id: 1, 
          softwareName: 'Accounting App', 
          requestedBy: 'John Doe', 
          requestedOn: '2023-05-15T10:30:00', 
          status: 'Pending',
          reason: 'Need access for financial reporting',
          accessType: 'Read'
        },
        { 
          id: 2, 
          softwareName: 'Inventory System', 
          requestedBy: 'Jane Smith', 
          requestedOn: '2023-05-16T14:45:00', 
          status: 'Pending',
          reason: 'Inventory management for warehouse',
          accessType: 'Write'
        },
        { 
          id: 3, 
          softwareName: 'HR Portal', 
          requestedBy: 'Mike Johnson', 
          requestedOn: '2023-05-17T09:15:00', 
          status: 'Pending',
          reason: 'Employee onboarding process',
          accessType: 'Admin'
        }
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleApprove = (id) => {
    // Simulate approval
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Approved' } : req
    ));
    setSelectedRequest(null);
  };

  const handleReject = (id) => {
    // Simulate rejection
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'Rejected' } : req
    ));
    setSelectedRequest(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="pending-requests-container">
      <div className="page-header">
        <h1>Pending Requests</h1>
        <p>Review and manage access requests from users</p>
      </div>

      {isLoading ? (
        <div className="loading-spinner">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="no-requests">
          <p>No pending requests found.</p>
        </div>
      ) : (
        <div className="requests-content">
          <div className="requests-table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Software</th>
                  <th>Requested By</th>
                  <th>Requested On</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(request => (
                  <tr key={request.id} onClick={() => setSelectedRequest(request)}>
                    <td>{request.id}</td>
                    <td>{request.softwareName}</td>
                    <td>{request.requestedBy}</td>
                    <td>{formatDate(request.requestedOn)}</td>
                    <td>
                      <span className={`status-badge ${request.status.toLowerCase()}`}>
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-success"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApprove(request.id);
                        }}
                      >
                        Approve
                      </button>
                      <button 
                        className="btn btn-sm btn-danger"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReject(request.id);
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedRequest && (
            <div className="request-details">
              <div className="details-header">
                <h3>Request Details</h3>
                <button 
                  className="btn btn-sm btn-outline"
                  onClick={() => setSelectedRequest(null)}
                >
                  Close
                </button>
              </div>
              <div className="details-content">
                <div className="detail-row">
                  <span className="detail-label">Software:</span>
                  <span>{selectedRequest.softwareName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Requested By:</span>
                  <span>{selectedRequest.requestedBy}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Requested On:</span>
                  <span>{formatDate(selectedRequest.requestedOn)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Access Type:</span>
                  <span>{selectedRequest.accessType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className={`status-badge ${selectedRequest.status.toLowerCase()}`}>
                    {selectedRequest.status}
                  </span>
                </div>
                <div className="detail-row full-width">
                  <span className="detail-label">Reason:</span>
                  <p>{selectedRequest.reason}</p>
                </div>
              </div>
              <div className="details-actions">
                <button 
                  className="btn btn-success"
                  onClick={() => handleApprove(selectedRequest.id)}
                >
                  Approve
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => handleReject(selectedRequest.id)}
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
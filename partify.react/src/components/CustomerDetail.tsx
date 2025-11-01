import React, { useEffect, useState } from 'react';
import type { Customer } from '../types/Customer';
import CustomerService from '../services/CustomerService';
import '../styles/CustomerStyles.css';

interface CustomerDetailProps {
  customerId: number;
  onBack: () => void;
  onEdit?: (customer: Customer) => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({ customerId, onBack, onEdit }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [outstanding, setOutstanding] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCustomer();
  }, [customerId]);

  const loadCustomer = async () => {
    try {
      setLoading(true);
      const [customerData, outstandingData] = await Promise.all([
        CustomerService.getCustomerById(customerId),
        CustomerService.getOutstanding(customerId)
      ]);
      setCustomer(customerData);
      setOutstanding(outstandingData);
    } catch (err) {
      setError('Failed to load customer details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading customer details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!customer) return <div>Customer not found</div>;

  return (
    <div className="customer-detail-container">
      <div className="detail-header">
        <button onClick={onBack} className="btn btn-secondary back-btn">
          <span className="btn-icon">⬅️</span>
          Back to Customers
        </button>
        <h2 className="detail-title">
          <span className="detail-icon">👤</span>
          Customer Details
        </h2>
      </div>

      <div className="detail-content">
        <div className="detail-card">
          <div className="detail-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label className="detail-label">Customer ID</label>
                <span className="detail-value">#{customer.id}</span>
              </div>
              <div className="detail-item">
                <label className="detail-label">First Name</label>
                <span className="detail-value">{customer.name || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <label className="detail-label">Last Name</label>
                <span className="detail-value">{customer.lastName || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <label className="detail-label">Email</label>
                <span className="detail-value">
                  {customer.email ? (
                    <a href={`mailto:${customer.email}`} className="email-link">
                      {customer.email}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </span>
              </div>
              <div className="detail-item">
                <label className="detail-label">Phone Number</label>
                <span className="detail-value">
                  {customer.phoneNumber ? (
                    <a href={`tel:${customer.phoneNumber}`} className="phone-link">
                      {customer.phoneNumber}
                    </a>
                  ) : (
                    'Not provided'
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Vehicle Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <label className="detail-label">Car Model</label>
                <span className="detail-value">{customer.carModel || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <label className="detail-label">License Plate</label>
                <span className="detail-value">{customer.plateNumber || 'Not provided'}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Address</h3>
            <div className="detail-item full-width">
              <label className="detail-label">Full Address</label>
              <span className="detail-value address-value">
                {customer.address || 'Not provided'}
              </span>
            </div>
          </div>

          {outstanding !== null && (
            <div className="detail-section">
              <h3 className="section-title">Financial Information</h3>
              <div className="detail-item">
                <label className="detail-label">Outstanding Amount</label>
                <span className={`detail-value outstanding-amount ${outstanding > 0 ? 'amount-due' : 'amount-paid'}`}>
                  ${outstanding.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="detail-actions">
          <button className="btn btn-outline">
            <span className="btn-icon">📞</span>
            Contact Customer
          </button>
          <button className="btn btn-outline">
            <span className="btn-icon">📄</span>
            View History
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => customer && onEdit?.(customer)}
            disabled={!customer}
          >
            <span className="btn-icon">✏️</span>
            Edit Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetail;
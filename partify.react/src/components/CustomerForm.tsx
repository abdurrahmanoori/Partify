import React, { useState, useEffect } from 'react';
import type { Customer, CustomerAdd, CustomerUpdate } from '../types/Customer';
import CustomerService from '../services/CustomerService';

interface CustomerFormProps {
  customer?: Customer;
  onSave: () => void;
  onCancel: () => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: customer?.name || '',
    lastName: customer?.lastName || '',
    email: customer?.email || '',
    phoneNumber: customer?.phoneNumber || '',
    address: customer?.address || '',
    carModel: customer?.carModel || '',
    plateNumber: customer?.plateNumber || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (customer) {
        // Update existing customer
        const updateData: CustomerUpdate = {
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phoneNumber,
          address: formData.address,
          carModel: formData.carModel,
          plateNumber: formData.plateNumber,
        };
        await CustomerService.updateCustomer(customer.id, updateData);
      } else {
        // Create new customer
        const addData: CustomerAdd = {
          name: formData.name,
          lastName: formData.lastName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          carModel: formData.carModel,
          plateNumber: formData.plateNumber,
        };
        await CustomerService.createCustomer(addData);
      }
      onSave();
    } catch (err) {
      setError('Failed to save customer');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-form-container">
      <div className="form-header">
        <h2 className="form-title">
          <span className="form-icon">{customer ? '✏️' : '➕'}</span>
          {customer ? 'Edit Customer' : 'Add New Customer'}
        </h2>
        <p className="form-subtitle">
          {customer ? 'Update customer information' : 'Fill in the details to create a new customer'}
        </p>
      </div>

      {error && (
        <div className="alert alert-error">
          <span className="alert-icon">❌</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter first name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName" className="form-label">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter last name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="customer@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Enter full address"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="carModel" className="form-label">
              Car Model
            </label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              value={formData.carModel || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Toyota Camry"
            />
          </div>

          <div className="form-group">
            <label htmlFor="plateNumber" className="form-label">
              License Plate
            </label>
            <input
              type="text"
              id="plateNumber"
              name="plateNumber"
              value={formData.plateNumber || ''}
              onChange={handleChange}
              className="form-input"
              placeholder="ABC-123"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            <span className="btn-icon">❌</span>
            Cancel
          </button>
          <button type="submit" disabled={loading} className="btn btn-primary">
            <span className="btn-icon">{loading ? '⏳' : '💾'}</span>
            {loading ? 'Saving...' : 'Save Customer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
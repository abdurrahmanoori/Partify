import React, { useState, useEffect } from 'react';
import type { Customer, CustomerAdd, CustomerUpdate } from '../types/Customer';
import CustomerService from '../services/CustomerService';
import '../styles/CustomerStyles.css';
import Swal from 'sweetalert2';

interface CustomerFormProps {
  customer?: Customer;
  onSave: () => void;
  onCancel: () => void;
}

interface FormErrors {
  name?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  carModel?: string;
  plateNumber?: string;
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
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation functions
  const validateName = (name: string) => {
    if (!name.trim()) return 'First name is required';
    if (name.trim().length < 2) return 'First name must be at least 2 characters';
    if (name.trim().length > 50) return 'First name must be less than 50 characters';
    if (!/^[a-zA-ZÀ-ÿ' -]+$/.test(name.trim())) return 'First name contains invalid characters';
    return null;
  };

  const validateLastName = (lastName: string) => {
    if (!lastName.trim()) return 'Last name is required';
    if (lastName.trim().length < 2) return 'Last name must be at least 2 characters';
    if (lastName.trim().length > 50) return 'Last name must be less than 50 characters';
    if (!/^[a-zA-ZÀ-ÿ' -]+$/.test(lastName.trim())) return 'Last name contains invalid characters';
    return null;
  };

  const validateEmail = (email: string) => {
    if (!email.trim()) return null; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return 'Please enter a valid email address';
    if (email.trim().length > 100) return 'Email must be less than 100 characters';
    return null;
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    if (!phoneNumber.trim()) return null; // Phone is optional
    // Remove all non-digits for validation
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) return 'Phone number must have at least 10 digits';
    if (cleanPhone.length > 15) return 'Phone number must be less than 15 digits';
    
    // Check for valid phone number patterns
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(cleanPhone)) return 'Please enter a valid phone number';
    return null;
  };

  const validateAddress = (address: string) => {
    if (!address.trim()) return null; // Address is optional
    if (address.trim().length > 500) return 'Address must be less than 500 characters';
    return null;
  };

  const validateCarModel = (carModel: string) => {
    if (!carModel.trim()) return null; // Car model is optional
    if (carModel.trim().length > 100) return 'Car model must be less than 100 characters';
    return null;
  };

  const validatePlateNumber = (plateNumber: string) => {
    if (!plateNumber.trim()) return null; // Plate number is optional
    if (plateNumber.trim().length > 20) return 'Plate number must be less than 20 characters';
    if (!/^[a-zA-Z0-9À-ÿ' -]+$/.test(plateNumber.trim())) return 'Plate number contains invalid characters';
    return null;
  };

  // Validate single field
  const validateField = (fieldName: string, value: string): string | null => {
    switch (fieldName) {
      case 'name': return validateName(value);
      case 'lastName': return validateLastName(value);
      case 'email': return validateEmail(value);
      case 'phoneNumber': return validatePhoneNumber(value);
      case 'address': return validateAddress(value);
      case 'carModel': return validateCarModel(value);
      case 'plateNumber': return validatePlateNumber(value);
      default: return null;
    }
  };

  // Validate all fields
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation for touched fields
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error || undefined }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);
    setTouched(allTouched);

    // Validate form
    if (!validateForm()) {
      await Swal.fire({
        title: 'Validation Error',
        text: 'Please fix the errors in the form before submitting.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal2-popup',
          confirmButton: 'swal2-confirm-button'
        }
      });
      return;
    }

    setLoading(true);

    try {
      if (customer) {
        // Update existing customer
        const updateData: CustomerUpdate = {
          name: formData.name.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim() || undefined,
          phoneNumber: formData.phoneNumber.trim() || undefined,
          address: formData.address.trim() || undefined,
          carModel: formData.carModel.trim() || undefined,
          plateNumber: formData.plateNumber.trim() || undefined,
        };
        await CustomerService.updateCustomer(customer.id, updateData);
        
        await Swal.fire({
          title: 'Updated Successfully!',
          text: `${formData.name} ${formData.lastName} has been updated successfully.`,
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      } else {
        // Create new customer
        const addData: CustomerAdd = {
          name: formData.name.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim() || undefined,
          phoneNumber: formData.phoneNumber.trim() || undefined,
          address: formData.address.trim() || undefined,
          carModel: formData.carModel.trim() || undefined,
          plateNumber: formData.plateNumber.trim() || undefined,
        };
        await CustomerService.createCustomer(addData);
        
        await Swal.fire({
          title: 'Customer Added!',
          text: `${formData.name} ${formData.lastName} has been added to the system successfully.`,
          icon: 'success',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      onSave();
    } catch (err) {
      console.error(err);
      
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to save customer. Please check your information and try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal2-popup',
          confirmButton: 'swal2-confirm-button'
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    const hasChanges = formData.name || formData.lastName || formData.email || 
                      formData.phoneNumber || formData.address || formData.carModel || formData.plateNumber;
    
    if (hasChanges && !loading) {
      const result = await Swal.fire({
        title: 'Unsaved Changes',
        text: 'You have unsaved changes. Are you sure you want to leave?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, leave',
        cancelButtonText: 'Stay here',
        customClass: {
          popup: 'swal2-popup',
          confirmButton: 'swal2-confirm-button',
          cancelButton: 'swal2-cancel-button'
        }
      });

      if (result.isConfirmed) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  const getFieldError = (fieldName: string): string | undefined => {
    return touched[fieldName] ? errors[fieldName as keyof FormErrors] : undefined;
  };

  const isFieldValid = (fieldName: string): boolean => {
    return touched[fieldName] && !errors[fieldName as keyof FormErrors];
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

      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-grid">
          <div className={`form-group ${getFieldError('name') ? 'has-error' : ''} ${isFieldValid('name') ? 'has-valid' : ''}`}>
            <label htmlFor="name" className="form-label">
              First Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${getFieldError('name') ? 'error' : ''} ${isFieldValid('name') ? 'valid' : ''}`}
              placeholder="Enter first name"
              required
            />
            {getFieldError('name') && (
              <span className="field-error">{getFieldError('name')}</span>
            )}
          </div>

          <div className={`form-group ${getFieldError('lastName') ? 'has-error' : ''} ${isFieldValid('lastName') ? 'has-valid' : ''}`}>
            <label htmlFor="lastName" className="form-label">
              Last Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${getFieldError('lastName') ? 'error' : ''} ${isFieldValid('lastName') ? 'valid' : ''}`}
              placeholder="Enter last name"
              required
            />
            {getFieldError('lastName') && (
              <span className="field-error">{getFieldError('lastName')}</span>
            )}
          </div>

          <div className={`form-group ${getFieldError('email') ? 'has-error' : ''} ${isFieldValid('email') ? 'has-valid' : ''}`}>
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${getFieldError('email') ? 'error' : ''} ${isFieldValid('email') ? 'valid' : ''}`}
              placeholder="customer@example.com"
            />
            {getFieldError('email') && (
              <span className="field-error">{getFieldError('email')}</span>
            )}
          </div>

          <div className={`form-group ${getFieldError('phoneNumber') ? 'has-error' : ''} ${isFieldValid('phoneNumber') ? 'has-valid' : ''}`}>
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${getFieldError('phoneNumber') ? 'error' : ''} ${isFieldValid('phoneNumber') ? 'valid' : ''}`}
              placeholder="+1 (555) 123-4567"
            />
            {getFieldError('phoneNumber') && (
              <span className="field-error">{getFieldError('phoneNumber')}</span>
            )}
          </div>

          <div className={`form-group form-group-full ${getFieldError('address') ? 'has-error' : ''} ${isFieldValid('address') ? 'has-valid' : ''}`}>
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-textarea ${getFieldError('address') ? 'error' : ''} ${isFieldValid('address') ? 'valid' : ''}`}
              placeholder="Enter full address"
              rows={3}
            />
            {getFieldError('address') && (
              <span className="field-error">{getFieldError('address')}</span>
            )}
          </div>

          <div className={`form-group ${getFieldError('carModel') ? 'has-error' : ''} ${isFieldValid('carModel') ? 'has-valid' : ''}`}>
            <label htmlFor="carModel" className="form-label">
              Car Model
            </label>
            <input
              type="text"
              id="carModel"
              name="carModel"
              value={formData.carModel || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${getFieldError('carModel') ? 'error' : ''} ${isFieldValid('carModel') ? 'valid' : ''}`}
              placeholder="e.g., Toyota Camry"
            />
            {getFieldError('carModel') && (
              <span className="field-error">{getFieldError('carModel')}</span>
            )}
          </div>

          <div className={`form-group ${getFieldError('plateNumber') ? 'has-error' : ''} ${isFieldValid('plateNumber') ? 'has-valid' : ''}`}>
            <label htmlFor="plateNumber" className="form-label">
              License Plate
            </label>
            <input
              type="text"
              id="plateNumber"
              name="plateNumber"
              value={formData.plateNumber || ''}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`form-input ${getFieldError('plateNumber') ? 'error' : ''} ${isFieldValid('plateNumber') ? 'valid' : ''}`}
              placeholder="ABC-123"
            />
            {getFieldError('plateNumber') && (
              <span className="field-error">{getFieldError('plateNumber')}</span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn btn-secondary" disabled={loading}>
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
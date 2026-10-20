import React, { useState } from 'react'; 
 
const RegistrationForm = ({ onSubmit, initialData }) => { 
  const [formData, setFormData] = useState(initialData || { 
    companyName: '', 
    ownerName: '', 
    email: '', 
    phone: '', 
    password: '', 
    address: '', 
    gstNumber: '' 
  }); 
 
  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; 
 
  const handleSubmit = (e) => { 
    e.preventDefault(); 
    onSubmit(formData); 
  }; 
 
  return ( 
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '500px', margin: '0 auto', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}> 
      <h3 style={{ marginBottom: '10px', color: '#1e293b' }}>Company Registration Details</h3> 
       
      {/* Company Name */} 
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}> 
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Company Name *</label> 
        <input  
          type="text"  
          name="companyName"  
          value={formData.companyName}  
          onChange={handleChange}  
          required  
          placeholder="Enter company name" 
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }} 
        /> 
      </div> 
 
      {/* Owner Name */} 
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}> 
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Owner/Admin Name *</label> 
        <input  
          type="text"  
          name="ownerName"  
          value={formData.ownerName}  
          onChange={handleChange}  
          required  
          placeholder="Enter owner name" 
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }} 
        /> 
      </div> 
 
      {/* Email & Phone Row */} 
      <div style={{ display: 'flex', gap: '16px' }}> 
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}> 
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Email *</label> 
          <input  
            type="email"  
            name="email"  
            value={formData.email}  
            onChange={handleChange}  
            required  
            placeholder="admin@company.com" 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }} 
          /> 
        </div> 
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}> 
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Phone *</label> 
          <input  
            type="tel"  
            name="phone"  
            value={formData.phone}  
            onChange={handleChange}  
            required  
            placeholder="9876543210" 
            style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }} 
          /> 
        </div> 
      </div> 

      {/* Password */} 
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}> 
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Password *</label> 
        <input  
          type="password"  
          name="password"  
          value={formData.password}  
          onChange={handleChange}  
          required  
          placeholder="Min 6 characters" 
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }} 
        /> 
      </div> 
 
      {/* GST Number (Optional) */} 
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}> 
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>GST Number (Optional)</label> 
        <input  
          type="text"  
          name="gstNumber"  
          value={formData.gstNumber}  
          onChange={handleChange}  
          placeholder="22AAAAA0000A1Z5" 
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }} 
        /> 
      </div> 
 
      {/* Address */} 
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}> 
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Full Address *</label> 
        <textarea  
          name="address"  
          value={formData.address}  
          onChange={handleChange}  
          required  
          rows="3" 
          placeholder="Enter full address" 
          style={{ padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', resize: 'vertical' }} 
        /> 
      </div> 
 
      <button  
        type="submit"  
        style={{ 
          marginTop: '10px', 
          padding: '12px', 
          backgroundColor: '#38bdf8', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '8px', 
          fontWeight: 'bold', 
          fontSize: '16px', 
          cursor: 'pointer' 
        }} 
      > 
        Continue to Payment 
      </button> 
    </form> 
  ); 
}; 
 
export default RegistrationForm;
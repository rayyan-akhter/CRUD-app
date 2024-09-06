import React, { useState } from 'react';
import './style.css'

const UserForm = ({ user, onUserAdd, onUserUpdate }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const localStorageUsers = JSON.parse(localStorage.getItem('users')) || [];

      if (user) {
        // Update existing user in local storage
        const updatedUsers = localStorageUsers.map((u) =>
          u.id === user.id ? { ...u, ...formData } : u
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        onUserUpdate && onUserUpdate();
        alert('User updated successfully');
      } else {
        // Create new user and add to local storage
        const newUser = { ...formData, id: Date.now() };
        localStorage.setItem('users', JSON.stringify([...localStorageUsers, newUser]));
        onUserAdd && onUserAdd();
        alert('User created successfully');
      }
    } catch (err) {
      alert('Failed to save user data');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />


      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <button type="submit">{user ? 'Update' : 'Create'} User</button>
    </form>
  );
};

export default UserForm;

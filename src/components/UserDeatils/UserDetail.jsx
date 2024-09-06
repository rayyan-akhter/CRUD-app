import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = () => {
    const localStorageUsers = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = localStorageUsers.find((u) => u.id === parseInt(id));
    if (foundUser) {
      setUser(foundUser);
    } else {
      setError('User not found in local storage');
    }
  };

  const handleUpdate = () => {
    fetchUser();
    alert('User updated successfully');
  };

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h3>Edit User</h3>
      <UserForm user={user} onUserUpdate={handleUpdate} />
      <button onClick={() => navigate('/')}>Back to User List</button>
    </div>
  );
};

export default UserDetail;

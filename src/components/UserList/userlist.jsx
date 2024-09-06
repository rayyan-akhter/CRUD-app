import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../UserForm/UserForm';
import './style.css';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 

  // Fetch users from the API and save them in local storage if not already present
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Fetch users from local storage
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (storedUsers.length > 0) {
        setUsers(storedUsers);
      } else {
        // Fetch users from the API
        const apiResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const apiUsers = apiResponse.data;

        // Save users fetched from the API into local storage
        localStorage.setItem('users', JSON.stringify(apiUsers));
        setUsers(apiUsers);
      }
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  // Delete a user from both state and local storage
  const deleteUser = (id) => {
    // Filter out the deleted user
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);

    // Update local storage with the filtered list
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  // Navigate to the edit page when the edit button is clicked
  const handleEditClick = (id) => {
    navigate(`/user/${id}`);
  };

  return (
    <div>
      <h3>User List</h3>
      {error && <p className="error">{error}</p>}
      <UserForm onUserAdd={fetchUsers} />
      {loading ? (
        <div className="loader-container">
          <ClipLoader size={90} color="#0000ff" />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className="action-btn-container">
                  <FiEdit
                    className="edit btn"
                    size={25}
                    onClick={() => handleEditClick(user.id)}
                  />
                  <AiOutlineDelete
                    className="delete btn"
                    size={25}
                    onClick={() => deleteUser(user.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;

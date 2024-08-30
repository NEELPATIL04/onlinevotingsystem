import React, { useState, useEffect } from 'react';
import { addCandidate, getCandidates, getVoteCounts, getUsers } from '../services/api';
import CandidateList from './adminonly/CandidateList';
import VoteCountList from './adminonly/VoteCountList';
import UserList from './adminonly/UserList';

function AdminPanel() {
  const [candidateForm, setCandidateForm] = useState({
    name: '',
    party: '',
    age: ''
  });
  const [candidates, setCandidates] = useState([]);
  const [voteCounts, setVoteCounts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCandidates();
    fetchVoteCounts();
    fetchUsers();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const fetchVoteCounts = async () => {
    try {
      const data = await getVoteCounts();
      setVoteCounts(data);
    } catch (error) {
      console.error('Error fetching vote counts:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleChange = (e) => {
    setCandidateForm({ ...candidateForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCandidate(candidateForm);
      alert('Candidate added successfully');
      setCandidateForm({ name: '', party: '', age: '' });
      fetchCandidates(); // Refresh the candidate list
    } catch (error) {
      console.error('Error adding candidate:', error);
      alert('Failed to add candidate');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            name="name"
            type="text"
            value={candidateForm.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="party">
            Party
          </label>
          <input
            name="party"
            type="text"
            value={candidateForm.party}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="age">
            Age
          </label>
          <input
            name="age"
            type="number"
            value={candidateForm.age}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Candidate
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Candidates</h3>
        {candidates.length > 0 ? (
          <CandidateList candidates={candidates} />
        ) : (
          <p>No candidates found</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Vote Counts</h3>
        {voteCounts.length > 0 ? (
          <VoteCountList voteCounts={voteCounts} />
        ) : (
          <p>No vote counts found</p>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Users</h3>
        {users.length > 0 ? (
          <UserList users={users} />
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;

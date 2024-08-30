// src/components/Vote.jsx

import React, { useState, useEffect } from 'react';
import { getCandidates, voteForCandidate } from '../services/api';

function Vote() {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
      setError('Failed to fetch candidates. Please try again.');
    }
  };

  const handleVote = async () => {
    if (!selectedCandidate) {
      setError('Please select a candidate before voting.');
      return;
    }

    try {
      await voteForCandidate(selectedCandidate);
      setSuccess('Your vote has been recorded successfully!');
      setSelectedCandidate(null);
    } catch (error) {
      console.error('Error casting vote:', error);
      setError('Failed to cast vote. You may have already voted or there was a system error.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Cast Your Vote</h2>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {candidates.length > 0 ? (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select a candidate:
            </label>
            <select
              value={selectedCandidate || ''}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">--Select a candidate--</option>
              {candidates.map((candidate) => (
                <option key={candidate._id} value={candidate._id}>
                  {candidate.name} - {candidate.party}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleVote}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cast Vote
          </button>
        </>
      ) : (
        <p>No candidates available at the moment.</p>
      )}
    </div>
  );
}

export default Vote;
import React, { useState } from 'react';
import { voteForCandidate } from '../services/api';

function CandidateItem({ candidate, onVote, hasVoted }) {
  const [confirmingVote, setConfirmingVote] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleVote = () => {
    if (hasVoted) {
      setErrorMessage('You have already voted.');
    } else {
      setConfirmingVote(true);
    }
  };

  const handleConfirmVote = async () => {
    try {
      await voteForCandidate(candidate._id);
      onVote(candidate._id);
      setConfirmingVote(false);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCancelVote = () => {
    setConfirmingVote(false);
    setErrorMessage('');
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 relative">
      <h3 className="text-xl font-bold mb-2">{candidate.name}</h3>
      <p className="mb-2"><strong>Party:</strong> {candidate.party}</p>
      <p className="mb-2"><strong>Age:</strong> {candidate.age}</p>
      <p className="mb-4"><strong>Votes:</strong> {candidate.voteCount}</p>
      <button
        onClick={handleVote}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute top-2 right-2 ${hasVoted ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={hasVoted}
      >
        Vote
      </button>
      {confirmingVote && (
        <div className="bg-white border rounded-lg absolute top-0 left-0 right-0 bottom-0 m-auto p-6 w-80">
          <p className="text-xl font-semibold mb-4">Confirm Vote</p>
          <p className="mb-4">Are you sure you want to vote for {candidate.party}?</p>
          <div className="flex justify-end">
            <button
              onClick={handleConfirmVote}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Yes
            </button>
            <button
              onClick={handleCancelVote}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              No
            </button>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className="text-red-500 mt-2">{errorMessage}</div>
      )}
    </div>
  );
}

export default CandidateItem;
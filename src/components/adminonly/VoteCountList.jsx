import React from 'react';

function VoteCountList({ voteCounts }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {voteCounts.map((voteCount) => (
        <div key={voteCount._id} className="mb-4 p-2 border-b">
          <p><strong>Candidate:</strong> {voteCount.candidateName}</p>
          <p><strong>Party:</strong> {voteCount.party}</p>
          <p><strong>Votes:</strong> {voteCount.count}</p>
        </div>
      ))}
    </div>
  );
}

export default VoteCountList;
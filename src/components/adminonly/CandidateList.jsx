import React from 'react';

function CandidateList({ candidates }) {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {candidates.map((candidate) => (
        <div key={candidate._id} className="mb-4 p-2 border-b">
          <p><strong>Name:</strong> {candidate.name}</p>
          <p><strong>Party:</strong> {candidate.party}</p>
          <p><strong>Age:</strong> {candidate.age}</p>
        </div>
      ))}
    </div>
  );
}

export default CandidateList;
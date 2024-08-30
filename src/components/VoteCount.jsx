import React, { useState, useEffect } from 'react';
import { getVoteCounts } from '../services/api';

function VoteCount() {
  const [voteCount, setVoteCount] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    fetchVoteCount();
  }, []);

  const fetchVoteCount = async () => {
    try {
      const response = await getVoteCounts();
      setVoteCount(response); // Assuming response is an array of objects
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching vote count:', error);
      setVoteCount([]); // Set voteCount to empty array on error
      setLoading(false); // Set loading to false on error
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Vote Count</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {!loading && voteCount.length > 0 ? (
          voteCount.map((item, index) => (
            <div key={index} className="mb-4 p-4 border-b last:border-b-0">
              <p className="text-xl font-semibold">{item.party}</p>
              {item.candidateName && (
                <div className="ml-4">
                  <p className="text-lg">Candidate: {item.candidateName}</p>
                  <p className="text-lg font-bold">Votes: {item.count}</p>
                </div>
              )}
              {!item.candidateName && <p className="text-lg">No candidates</p>}
            </div>
          ))
        ) : (
          <p>No vote counts available.</p>
        )}
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default VoteCount;

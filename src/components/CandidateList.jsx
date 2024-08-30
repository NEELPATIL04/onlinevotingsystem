import React, { useState, useEffect } from 'react';
import CandidateItem from './CandidateItem';
import { getCandidates } from '../services/api';

function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    fetchCandidates();
    checkVoteStatus();
  }, []);

  const fetchCandidates = async () => {
    try {
      const data = await getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const checkVoteStatus = () => {
    // Check if the user has voted (you might want to get this from your API or local storage)
    const votedStatus = localStorage.getItem('hasVoted') === 'true';
    setHasVoted(votedStatus);
  };

  const handleVote = (candidateId) => {
    setCandidates(prevCandidates =>
      prevCandidates.map(candidate =>
        candidate._id === candidateId
          ? { ...candidate, voteCount: candidate.voteCount + 1 }
          : candidate
      )
    );
    setHasVoted(true);
    localStorage.setItem('hasVoted', 'true');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {candidates.map(candidate => (
        <CandidateItem
          key={candidate._id}
          candidate={candidate}
          onVote={handleVote}
          hasVoted={hasVoted}
        />
      ))}
    </div>
  );
}

export default CandidateList;
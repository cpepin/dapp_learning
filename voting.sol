pragma solidity ^0.4.6;

contract Voting {

  mapping(bytes32 => uint8) public votesRecieved;

  bytes32[] public candidateList;

  function Voting(bytes32[] candidateNames) {
    candidateList = candidateNames;
  }

  function totalVotesFor(bytes32 candidate) returns (uint8) {
    if (validateCandidate(candidate) == false) throw;
    return votesRecieved[candidate];
  }

  function voteForCandidate(bytes32 candidate) {
    if (validateCandidate(candidate) == false) throw;
    votesRecieved[candidate] += 1;
  }

  function validateCandidate(bytes32 candidate) {
    for (uint i = 0; i < candidateList.length; i++) {
      if (candidateList[i] == candidate) {
        return true;
      }
    }
    return false;
  }


}

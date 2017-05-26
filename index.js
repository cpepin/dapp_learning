const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const abi = JSON.parse('[{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"validateCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"totalVotesFor","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"candidateList","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"candidate","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"bytes32"}],"name":"votesRecieved","outputs":[{"name":"","type":"uint8"}],"payable":false,"type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"type":"constructor"}]');
const VotingContract = web3.eth.contract(abi);

const contractInstance = VotingContract.at('0x35d7afa64071aaf926c0360f478a8cf4c46a391b');
const candidates = {"Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3"};

function voteForCandidate() {
  candidateName = document.getElementById('candidate').value;
  contractInstance.voteForCandidate(candidateName, {from: web3.eth.accounts[0]}, () => {
    let div_id = candidates[candidateName];
    document.getElementById(div_id).innerHTML = contractInstance.totalVotesFor.call(candidateName).toString();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  candidateNames = Object.keys(candidates);
  for (var i = 0; i < candidateNames.length; i++) {
    let name = candidateNames[i];
    let val = contractInstance.totalVotesFor.call(name).toString()
    document.getElementById(candidates[name]).innerHTML = val;
  }
});

pragma solidity ^0.5.2;

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

import './ERC721Mintable.sol';
import "./Verifier.sol";



// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class

contract SolnSquareVerifier is CustomERC721Token, Verifier {

// TODO define a solutions struct that can hold an index & an address

    struct Solution {
        uint id;
        address from;
    }

// TODO define an array of the above struct

    Solution[] private solutionlist;

// TODO define a mapping to store unique solutions submitted

    mapping(bytes32 => Solution) solutions;

// TODO Create an event to emit when a solution is added

    event NewSolution(address from, uint id, bytes32 value);

// TODO Create a function to add the solutions to the array and emit the event

    function setSolution(address _from, uint _id, bytes32 _value) private {
        Solution memory item = Solution(_id, _from);
        solutions[_value] = item;
        emit NewSolution(_from, _id, _value);
    }

// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly


    function mintToken (address _from,
            uint _tokenId,
            uint[2] memory a,
            uint[2] memory a_p,
            uint[2][2] memory b,
            uint[2] memory b_p,
            uint[2] memory c,
            uint[2] memory c_p,
            uint[2] memory h,
            uint[2] memory k,
            uint[2] memory input) public
            {
        bytes32 _value = keccak256(abi.encodePacked(a, a_p, b, b_p, c, c_p, h, k, input));
        require(verifyTx(a, a_p, b, b_p, c, c_p, h, k, input) == true, "proof value is invlaid");
        require(solutions[_value].from == address(0), "solution already claimed");
        setSolution(_from, _tokenId, _value);
        super.mint(_from, _tokenId);
    }


}
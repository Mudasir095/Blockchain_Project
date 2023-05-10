// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


contract Product {
    struct MyStruct {
        uint256 id;
        string name;
        string source;
        string destination;
        string remark;
        uint256 currentBlockTime;
        address account ;
        
        // add data here
        
    }
    
//
    mapping(uint256 => MyStruct[]) public myStructs;


    function add(uint256 _id, string memory _name, string memory _source, string memory _destination,string memory _remark) public {

        myStructs[_id].push(MyStruct(_id, _name,_source,_destination,_remark,block.timestamp ,msg.sender));
    }

    function update(uint256 _id, string memory _name, string memory _source, string memory _destination,string memory _remark)  public{
        
        uint256 k = myStructs[_id].length - 1;
        MyStruct storage myStruct = myStructs[_id][k];
        myStruct.name = _name;
        myStruct.source = _source;
        myStruct.destination = _destination;
        myStruct.remark = _remark;
        myStruct.currentBlockTime = block.timestamp;
        myStruct.account = msg.sender;

    }

    function show(uint256 _id) public view returns (MyStruct[] memory) {    
        return myStructs[_id];
        }
}
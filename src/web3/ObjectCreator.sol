// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract ObjectCreator {
    // Stores the user > list of objects > objects
    mapping(address => mapping(uint256  => SafeObject)) public objects;

    // Stores the number of objects a user has
    mapping(address => uint) public numObjects;

    // Stores the cyphered password
    mapping(address => string) public password;

    // Represents an object
    struct SafeObject {
        uint objectType;
        string data;
        bool displayed;
    }

    function saveObject(uint _objectType, string memory _data) public {
        objects[msg.sender][numObjects[msg.sender]] = SafeObject(_objectType, _data, true);
        numObjects[msg.sender]++;
    }

    function deleteObject(uint id) public {
        objects[msg.sender][id].displayed = false;
    }

    function editObject(uint id, string memory _data) public {
        objects[msg.sender][id].displayed = false;
        saveObject(objects[msg.sender][id].objectType, _data);
    }
}
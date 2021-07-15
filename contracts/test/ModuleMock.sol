// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.0;

contract ModuleMock {
    bool public isInitialized = false;

    function initialize() external {
        isInitialized = true;
    }
}

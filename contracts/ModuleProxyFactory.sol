// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.0;

import "./DaoModule.sol";

contract ModuleProxyFactory {
    event ModuleProxyCreation(address proxy);

    function createClone(address target) internal returns (address result) {
        bytes20 targetBytes = bytes20(target);
        assembly {
            let clone := mload(0x40)
            mstore(
                clone,
                0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000000000000000000000
            )
            mstore(add(clone, 0x14), targetBytes)
            mstore(
                add(clone, 0x28),
                0x5af43d82803e903d91602b57fd5bf30000000000000000000000000000000000
            )
            result := create(0, clone, 0x37)
        }

        emit ModuleProxyCreation(result);
    }

    // function deployModule(bytes memory initializeParams) public  {

    // }
    function deployModule(
        address target,
        Executor _executor,
        Realitio _oracle,
        uint32 timeout,
        uint32 cooldown,
        uint32 expiration,
        uint256 bond,
        uint256 templateId
    ) public returns (address clone) {
        clone = createClone(target);
        DaoModule(clone).setUp(
            _executor,
            _oracle,
            timeout,
            cooldown,
            expiration,
            bond,
            templateId
        );
        ModuleProxyCreation(clone);
    }
}

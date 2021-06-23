// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.0;

contract Enum {
    enum Operation {
        Call,
        DelegateCall
    }
}

interface Executor {
    function execTransactionFromModule(
        address to,
        uint256 value,
        bytes calldata data,
        Enum.Operation operation
    ) external returns (bool success);
}

interface Realitio {
    function resultFor(bytes32 question_id) external view returns (bytes32);

    function getFinalizeTS(bytes32 question_id) external view returns (uint32);

    function getBond(bytes32 question_id) external view returns (uint256);
}

interface DaoModule {
    function setUp(
        Executor _executor,
        Realitio _oracle,
        uint32 timeout,
        uint32 cooldown,
        uint32 expiration,
        uint256 bond,
        uint256 templateId
    ) external;
}

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

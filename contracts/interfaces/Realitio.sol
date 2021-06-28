// SPDX-License-Identifier: LGPL-3.0-only
pragma solidity >=0.8.0;

interface Realitio {
    function resultFor(bytes32 questionId) external view returns (bytes32);

    function getFinalizeTS(bytes32 questionId) external view returns (uint32);

    function getBond(bytes32 questionId) external view returns (uint256);

    function askQuestion(
        uint256 templateId,
        string calldata question,
        address arbitrator,
        uint32 timeout,
        uint32 openingTs,
        uint256 nonce
    ) external returns (bytes32);
}

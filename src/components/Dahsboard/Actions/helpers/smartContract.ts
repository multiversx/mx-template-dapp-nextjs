import {
  AbiRegistry,
  SmartContractAbi,
  SmartContract,
  Address
} from '@multiversx/sdk-core/out';
import { contractAddress } from '@/config';
import json from '@/abi/ping-pong.abi.json';

const abiRegistry = AbiRegistry.create(json);
const abi = new SmartContractAbi(abiRegistry);

export const smartContract = new SmartContract({
  address: new Address(contractAddress),
  abi
});

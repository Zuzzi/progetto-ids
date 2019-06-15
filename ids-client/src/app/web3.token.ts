import { InjectionToken } from '@angular/core';
import Web3 from 'web3';

export const WEB3 = new InjectionToken<Web3>('web3', {
  providedIn: 'root',
  factory: () => {
    try {
      const options = {
        defaultAccount: '0xed9d02e382b34818e88b88a309c7fe71e65f419d',
        defaultGasPrice: '0',
        defaultGas: 4500000,
        transactionConfirmationBlocks: 6,
      };
      return new Web3(new Web3.providers.WebsocketProvider(
        'ws://localhost:22000'),
        null,
        options);

    } catch (err) {
      throw new Error('Can\'t instantiate Web3 module');
    }
  }
});

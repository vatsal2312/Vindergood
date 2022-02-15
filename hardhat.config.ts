import '@nomiclabs/hardhat-waffle';
import { HardhatUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-typechain';
import 'hardhat-gas-reporter';
import 'hardhat-abi-exporter';
import 'hardhat-deploy';

const dotenv = require('dotenv');
dotenv.config();

const PRIVATE_KEY = process.env.DEPLOYER_PRIVATE_KEY;
const BSC_API_KEY = process.env.BSC_API_KEY;
const ETH_API_KEY = process.env.ETH_API_KEY;
const NETWORK = process.env.NETWORK;
const INFURA_KEY = process.env.INFURA_KEY;

const config: HardhatUserConfig & { namedAccounts: any } = {
  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
  },
  solidity: {
    version: '0.7.5',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  etherscan: {
    apiKey: NETWORK === 'BSC' ? BSC_API_KEY : ETH_API_KEY,
  },
  gasReporter: {
    currency: 'USD',
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    excludeContracts: ['contracts/mocks/', 'contracts/libraries/'],
    gasPrice: 60,
  },
  mocha: {
    timeout: 599999,
  },
  defaultNetwork: 'hardhat',
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
    },
    bscTestnet: {
      accounts: [PRIVATE_KEY as string],
      chainId: 97,
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    },
    bscMainnet: {
      accounts: [PRIVATE_KEY as string],
      chainId: 56,
      url: 'https://dataseed1.binance.org/',
    },
    rinkebyTestnet: {
      accounts: [PRIVATE_KEY as string],
      chainId: 4,
      url: 'https://rinkeby.infura.io/v3/' + INFURA_KEY,
    },
    ethMainnet: {
      accounts: [PRIVATE_KEY as string],
      chainId: 1,
      url: 'https://mainnet.infura.io/v3/' + INFURA_KEY,
    },
  },
  typechain: {
    outDir: './types',
    target: 'ethers-v5',
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  paths: {
    artifacts: 'artifacts',
    cache: 'cache',
    deploy: 'deploy',
    deployments: 'deployments',
    imports: 'imports',
    sources: 'contracts',
    tests: 'test',
  },
};

export default config;

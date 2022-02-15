import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const Initialize: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts } = hre;
  const { execute } = deployments;
  const { deployer } = await getNamedAccounts();

  const exchangeAddress = (await deployments.get('VindergoodExchange')).address;

  await execute(
    'VindergoodRegistry',
    { from: deployer, gasLimit: '300000', log: true },
    'grantInitialAuthentication',
    exchangeAddress
  );
};

Initialize.tags = ['INITIALIZE'];
Initialize.runAtTheEnd = true;

export default Initialize;

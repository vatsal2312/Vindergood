import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployVindergoodStoreMultipleSupply: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Vindergood1155', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  });
};

deployVindergoodStoreMultipleSupply.tags = ['STORE_MULTIPLE_SUPPLY'];
deployVindergoodStoreMultipleSupply.dependencies = ['REGISTRY'];

export default deployVindergoodStoreMultipleSupply;

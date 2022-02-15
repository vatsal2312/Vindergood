import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployVindergoodStore: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  await deploy('Vindergood721', {
    from: deployer,
    args: [],
    log: true,
    deterministicDeployment: false,
  });
};

deployVindergoodStore.tags = ['STORE'];
deployVindergoodStore.dependencies = ['REGISTRY'];

export default deployVindergoodStore;

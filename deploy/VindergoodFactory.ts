import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployFactory: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const registryAddress = (await deployments.get('VindergoodRegistry')).address;
  const vindergoodStore = (await deployments.get('Vindergood721')).address;
  const vindergoodStoreMultipleSupplyAddress = (
    await deployments.get('Vindergood1155')
  ).address;
  const vindergoodExchange = (await deployments.get('VindergoodExchange'))
    .address;

  await deploy('VindergoodFactory', {
    from: deployer,
    args: [
      vindergoodStoreMultipleSupplyAddress,
      vindergoodStore,
      registryAddress,
      vindergoodExchange,
    ],
    log: true,
    deterministicDeployment: false,
  });
};

deployFactory.dependencies = [
  'REGISTRY',
  'STORE',
  'STORE_MULTIPLE_SUPPLY',
  'EXCHANGE',
];
deployFactory.tags = ['FACTORY'];

export default deployFactory;

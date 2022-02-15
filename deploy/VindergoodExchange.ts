import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployExchange: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const registryAddress = (await deployments.get('VindergoodRegistry')).address;
  const transferProxy = (await deployments.get('VindergoodTransferProxy'))
    .address;

  await deploy('VindergoodExchange', {
    from: deployer,
    args: [
      registryAddress,
      transferProxy,
      '0x0000000000000000000000000000000000000000',
    ],
    log: true,
    deterministicDeployment: false,
  });
};

deployExchange.dependencies = ['REGISTRY', 'PACE', 'TRANSFER_PROXY'];
deployExchange.tags = ['EXCHANGE'];

export default deployExchange;

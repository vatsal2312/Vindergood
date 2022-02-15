import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';

const deployMainStore: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const registryAddress = (await deployments.get('VindergoodRegistry')).address;

  await deploy('VindergoodToken', {
    from: deployer,
    args: [
      'Xtremcoin',
      'XTR',
      registryAddress,
      'https://be.api.xtrem.sotatek.works/api/v1/nfts/metadata/pace/',
      '0x0000000000000000000000000000000000000000',
    ],
    log: true,
    deterministicDeployment: false,
  });
};

deployMainStore.tags = ['MAIN_STORE'];
deployMainStore.dependencies = ['REGISTRY'];

export default deployMainStore;

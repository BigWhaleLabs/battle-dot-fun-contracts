import { ethers, upgrades, network } from 'hardhat'
import {
  printChainInfo,
  printDeploymentTransaction,
  printSignerInfo,
  verifyContract,
  waitOneMinute,
} from './helpers'

async function main() {
  // Print info
  await printChainInfo()
  await printSignerInfo()
  // Deploy contract
  const contractName = 'MemecoinRouter'
  console.log(`Deploying ${contractName}...`)
  const Contract = await ethers.getContractFactory(contractName)
  const contract = await upgrades.deployProxy(
    Contract,
    [
      '0x40589573777Ec4548Bd5157643D9FeDc8D0Fea4E',
      network.name === 'testnet'
        ? '0x050E797f3625EC8785265e1d9BDd4799b97528A1'
        : '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    ],
    {
      kind: 'transparent',
    }
  )
  printDeploymentTransaction(contract)
  await contract.waitForDeployment()
  // Verify contract
  await waitOneMinute()
  await verifyContract(contract)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

import { ethers, network, run, upgrades } from 'hardhat'

async function main() {
  const factory = await ethers.getContractFactory('MemecoinRouter')
  const proxyAddress =
    network.name === 'testnet'
      ? '0xC763f3d8AD1f21407C862503d1E5cD7b55373F89'
      : '0x3D8B7Ed20e31cd9CA6Ca275fcbDE32Af26E17585'
  console.log('Upgrading MemecoinRouter...')
  const contract = await upgrades.upgradeProxy(proxyAddress as string, factory)
  console.log('MemecoinRouter upgraded')
  console.log(
    await upgrades.erc1967.getImplementationAddress(
      await contract.getAddress()
    ),
    ' getImplementationAddress'
  )
  console.log(
    await upgrades.erc1967.getAdminAddress(await contract.getAddress()),
    ' getAdminAddress'
  )
  console.log('Wait for 1 minute to make sure blockchain is updated')
  await new Promise((resolve) => setTimeout(resolve, 60 * 1000))
  // Try to verify the contract on Etherscan
  console.log('Verifying contract on Etherscan')
  try {
    await run('verify:verify', {
      address: await upgrades.erc1967.getImplementationAddress(
        await contract.getAddress()
      ),
      constructorArguments: [],
    })
  } catch (err) {
    console.log(
      'Error verifying contract on Etherscan:',
      err instanceof Error ? err.message : err
    )
  }
  // Print out the information
  console.log(`Done!`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

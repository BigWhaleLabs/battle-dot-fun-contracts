import { ethers } from 'hardhat'
import { expect } from 'chai'

describe('MemecoinRouter contract tests', () => {
  before(async function () {
    const accounts = await ethers.getSigners()
    this.owner = accounts[0]
    this.factory = await ethers.getContractFactory('MemecoinRouter')
  })

  describe('Constructor', function () {
    it('should deploy the contract with the correct fields', async function () {
      const contract = await this.factory.deploy(this.owner.address)
      expect(await contract.owner()).to.equal(this.owner.address)
    })
  })
})

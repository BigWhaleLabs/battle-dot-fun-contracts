import { ZeroAddress } from 'ethers'
import { ethers, upgrades } from 'hardhat'
import { expect } from 'chai'

describe('MemecoinRouter contract tests', () => {
  let owner

  beforeEach(async function () {
    ;[owner] = await ethers.getSigners()
    this.MemecoinRouter = await ethers.getContractFactory('MemecoinRouter')
    this.memecoinRouter = await upgrades.deployProxy(this.MemecoinRouter, [
      owner.address,
      ZeroAddress,
    ])
  })

  describe('Initialization', function () {
    it('should have correct initial values', async function () {
      expect(await this.memecoinRouter.owner()).to.equal(owner)
    })
  })
})

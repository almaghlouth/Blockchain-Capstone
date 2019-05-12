var ERC721MintableComplete = artifacts.require("CustomERC721Token");

contract("TestERC721Mintable", accounts => {
  describe("match erc721 spec", function() {
    beforeEach(async function() {
      this.contract = await ERC721MintableComplete.new({ from: accounts[0] });

      // TODO: mint multiple tokens

      for (var i = 1; i < 10; i++) {
        await this.contract.mint(accounts[i], i, { from: accounts[0] });
        //console.log("Token #" + i + " Minted for "+ accounts[i]);
      }
    });

    it("should return total supply", async function() {
      let result = await this.contract.totalSupply();
      //console.log(result);
      assert.equal(await result, 9);
    });

    it("should get token balance", async function() {
      let result = await this.contract.balanceOf(accounts[2], {
        from: accounts[2]
      });
      //console.log(result);
      assert.equal(await result, 1);
    });

    // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
    it("should return token uri", async function() {
      let result = await this.contract.tokenURI(3);
      //console.log(result);
      assert.equal(
        await result,
        "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/3"
      );
    });

    it("should transfer token from one owner to another", async function() {
      await this.contract.transferFrom(accounts[4], accounts[5], 4, {
        from: accounts[4]
      });
      let result = await this.contract.balanceOf(accounts[5], {
        from: accounts[5]
      });
      //console.log(result);
      assert.equal(await result, 2);
    });
  });

  describe("have ownership properties", function() {
    beforeEach(async function() {
      this.contract = await ERC721MintableComplete.new({ from: accounts[0] });
    });

    it("should fail when minting when address is not contract owner", async function() {
      let accessDenied = false;
      try {
        await this.contract.mint(accounts[2], 1, { from: accounts[2] });
      } catch (e) {
        accessDenied = true;
      }
      assert.equal(accessDenied, true);
    });

    it("should return contract owner", async function() {
      let result = await this.contract.getContractOwner();
      //console.log(result);
      assert.equal(await result, accounts[0]);
    });
  });
});

// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
contract("SolnSquareVerifier", accounts => {
  describe("Start Tests", function() {
    beforeEach(async function() {
      this.contract = await SolnSquareVerifier.new({
        from: accounts[0],
        gasLimit: 50000000
      });
    });

    var obj = {
      proof: {
        a: [
          "0x26a56d18951fe33faa33b7d9abfd0be5829c17967bc508cb69d52225b7f2a276",
          "0x1a8e6631f2ea814e006ccb5b46edf61aba67a26201f08f7ace2f28797ff7941f"
        ],
        b: [
          [
            "0x1878ffca98dd4b66c9234c5c26799ba7017652601b8d6f0578db89e8bd916df9",
            "0x2ea61b008035fd8138cca7a40c0a94719a15d1eff17f5116f994b851986d2f56"
          ],
          [
            "0x0d37453c27606863770960921720fbf5142c40de2d5bac61ac49884902c16cb8",
            "0x02c9f68ec94e4bd31a2f4710fbd464cb4dfee0a901856b286668fc06bb768f87"
          ]
        ],
        c: [
          "0x0f066ac9a1afa2f2f007cf39ae0a4a50de154699cbb81f8edeb2677ae0a83295",
          "0x0d0b1e78621ae5c666332805d9fa6c2cc08a350a43438110bf8306a73134271e"
        ]
      },
      inputs: [
        "0x0000000000000000000000000000000000000000000000000000000000000009",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
      ]
    };

    it("Mint a Token with a proof", async function() {
      //try {
      await this.contract.mintToken(
        accounts[1],
        1,
        obj.proof.a,
        obj.proof.b,
        obj.proof.c,
        obj.inputs,
        { from: accounts[0] }
      );
      //} catch (e) {}
      let result = await this.contract.balanceOf(accounts[3], {
        from: accounts[2]
      });
      assert.equal(result, 1);
    });

    it("Cannot mint a token with a used proof", async function() {
      let accessDenied = false;
      try {
        await this.contract.mintToken(
          accounts[4],
          2,
          obj.proof.a,
          obj.proof.b,
          obj.proof.c,
          obj.inputs,
          { from: accounts[0] }
        );
      } catch (e) {
        accessDenied = true;
      }
      assert.equal(accessDenied, true);
    });
  });
});

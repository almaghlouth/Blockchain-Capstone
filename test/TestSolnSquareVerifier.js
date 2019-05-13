// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier

var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
contract("SolnSquareVerifier", accounts => {
  describe("Start Tests", function() {
    beforeEach(async function() {
      this.contract = await SolnSquareVerifier.new({
        from: accounts[0]
      });
    });

    var obj = {
      proof: {
        A: [
          "0x208b9e623a07d60cc014722cade248fde116ba70c1e3e58cf4adf6588fdf62c9",
          "0x26c509a32f5bdc9286dcda6c6f4a154d0eb754ec8484bf0ddafec7fefa4d28d5"
        ],
        A_p: [
          "0x207fcb742da97546b9931162d69146c7ed3d6672d4ca8468b17d8744ed3f146f",
          "0x23725b54e1fafc8ff00952fd40924c0c60308a64de017039983ff2f035109d55"
        ],
        B: [
          [
            "0x2b207996747d0df310f2269e61b5bcedd6bc255dc0c4844c9a06f47f0c0b2cbb",
            "0x18024c97cca078345abff5d0bc0f65f947ae8dd8789e4751ec7d530f1a20ed14"
          ],
          [
            "0x235550894e6753cbed8d67013c1377a057030ac655d384333b04d0679bf19492",
            "0x0d2f8740f2530c425511959fc3ae08d276052be9ebd1c9e9915e87fec79b8b55"
          ]
        ],

        B_p: [
          "0x0c484d794045a6bce47cdc5db82ac5229da562a6e6acdec648c7a35bdac6462d",
          "0x16264c3c888328958723acc1027e4c5a49821b51639eb8458b696cfd95b4d907"
        ],
        C: [
          "0x188142a1e5ee0f15e1eff3380cb39131e6ce7933173aaae49802009db831a6b6",
          "0x19a7c18a23a31dd4d6b52e493e08c0c9b5380da172bc79415998de6db59a92ff"
        ],
        C_p: [
          "0x22d7e472c3ef6f3acbacfb11492be13b10d9f87d671f97a6d52671131822126e",
          "0x0af88272cb532413208044c57044ae91483a72e6d057ac1ff12bca1d4f2aafdb"
        ],
        H: [
          "0x1cfbf417125b2f2af810d3e479301d850b22fecdf1bd93fff77bdf72b9d8416f",
          "0x17482d0df62c93a29f739a67f0a1d60e4ccd6eebed80ef50450314e5bd6e6934"
        ],
        K: [
          "0x2e3a42eb4dbfba417ec6f9d0d81396e1285d05b7fae449c9eedb56cf94830e6b",
          "0x017dc50a444b9aaacc070b9fa6e969be83295e0bd833eaa85d5505d100a49fa2"
        ]
      },
      input: [
        0000000000000000000000000000000000000000000000000000000000000009,
        0000000000000000000000000000000000000000000000000000000000000001
      ]
    };

    it("Mint a Token with a proof", async function() {
      //try {
      await this.contract.mintToken(
        accounts[3],
        1,
        obj.proof.A,
        obj.proof.A_p,
        obj.proof.B,
        obj.proof.B_p,
        obj.proof.C,
        obj.proof.C_p,
        obj.proof.H,
        obj.proof.K,
        obj.input,
        { from: accounts[0] }
      );
      //} catch (e) {}
      let result = await this.contract.balanceOf(accounts[3], {
        from: accounts[2]
      });
      assert.equal(result, 1);
    });

    it("Cannot mint a token with a used proof", async function() {
      await this.contract.mintToken(
        accounts[3],
        2,
        obj.proof.A,
        obj.proof.A_p,
        obj.proof.B,
        obj.proof.B_p,
        obj.proof.C,
        obj.proof.C_p,
        obj.proof.H,
        obj.proof.K,
        obj.input,
        { from: accounts[0] }
      );

      try {
        await this.contract.mintToken(
          accounts[4],
          2,
          obj.proof.A,
          obj.proof.A_p,
          obj.proof.B,
          obj.proof.B_p,
          obj.proof.C,
          obj.proof.C_p,
          obj.proof.H,
          obj.proof.K,
          obj.input,
          { from: accounts[0] }
        );
      } catch (e) {}
      let result = await this.contract.balanceOf(accounts[4], {
        from: accounts[2]
      });
      assert.equal(result, 0);
    });
  });
});

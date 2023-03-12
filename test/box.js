const { expect } = require("chai");

let Box, box;

// Start test block
describe("Box (proxy)", function () {
  beforeEach(async function () {
    Box = await ethers.getContractFactory("Box");
    box = await upgrades.deployProxy(Box, [42], { initializer: "initialize" });
  });
  it("retrieve returns a value previously initialized", async function () {
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    expect((await box.val()).toString()).to.equal("42");
    expect(() => {
      box.inc();
    }).to.throw(TypeError);
  });
  it("upgrades", async function () {
    const BoxV2 = await ethers.getContractFactory("BoxV2");
    box = await upgrades.upgradeProxy(box.address, BoxV2);
    await box.inc();
    let result = await box.val();
    expect((await box.val()).toString()).to.equal("43");
  });
});

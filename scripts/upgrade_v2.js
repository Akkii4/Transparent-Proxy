// scripts/upgrade_box.js
const { ethers, upgrades } = require("hardhat");

const PROXY = "0x6fbA0f44574D9c86d7DB431508DbB968d26d60a0";

async function main() {
  const BoxV2 = await ethers.getContractFactory("BoxV2");
  console.log("Upgrading Box...");
  await upgrades.upgradeProxy(PROXY, BoxV2);
  console.log("Box upgraded");
}

main();

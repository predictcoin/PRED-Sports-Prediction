
const {ethers, upgrades} = require("hardhat");

async function main() {

  const adminAddress = process.env.ADMIN_ADDRESS;
  const predToken = process.env.PRED_TOKEN;
  const SportOracle = await ethers.getContractFactory("SportOracle");
  const SportPrediction = await ethers.getContractFactory("SportPrediction");
  const sportOracle = await upgrades.deployProxy(SportOracle,[adminAddress],{kind:"uups"});
  const SportPredictionTreasury = await ethers.getContractFactory("SportPredictionTreasury");
  const treasury = await SportPredictionTreasury.deploy();
  const sportPrediction = await upgrades.deployProxy(SportPrediction,
    [ sportOracle.address,
      treasury.address,
      predToken,
      ethers.utils.parseUnits("100"),
      10,
      10],
      {kind: "uups"});
  
  await treasury.setSportPredictionAddress(sportPrediction.address);

  console.log(`
    SportOracle deployed to: ${sportOracle.address},
    SportPrediction: ${sportPrediction.address},
    SportPredictionTreasury: ${treasury.address}`);

}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

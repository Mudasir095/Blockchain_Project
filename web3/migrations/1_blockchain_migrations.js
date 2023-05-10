const demo = artifacts.require("Product");

module.exports = function (deployer) {
    deployer.deploy(demo);
}
//example of contract deploying on our own ganache instance using ether.js -with basic contract deployment we used some functions from our abi(retrieve and store)

const ethers = require('ethers');
const fs = require('fs-extra');
require("dotenv").config(); //
// nmp install dotenv package ->require("dotenv").config(); -> we can access our envirionment variables from our .env file which we hide in .gitignore through process.env
//we can add environmental variables into the terminal, and later delete history   - the safest option
async function main(){
const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);

const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8");
const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf-8");

const contractFactory = new ethers.ContractFactory(abi,binary, wallet);
console.log("Deploying, please wait...");
const contract = await contractFactory.deploy();
 await contract.deployTransaction.wait(1);

//using some functions from our abi such as retrieve and store
 const currentFavoriteNumber =await contract.retrieve();

 console.log(`Current Favorite Number: ${currentFavoriteNumber.toString()}`);

//we get BigNumber response
//Big number is a library that comes with ether.js that helps us working with numbers
//-solidity can't use decimal places
//so we must convert it to string .toString()
const transactionResponse =  await contract.store("7");
//we pass numbers as strings and ether treats them as numbers
const transactionReceipt = await transactionResponse.wait(1);
const updatedFavoriteNumber = await contract.retrieve();
console.log(`Updated favorite number is : ${updatedFavoriteNumber}`);

}
main()
.then(()=> process.exit(0))
.catch((error)=>{
    console.log(error)
    process.exit(1)
})


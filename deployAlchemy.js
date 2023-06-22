//   Alchemy is real network node we use to communicate with a chain and our test net (Sepolia) 
//   https://dashboard.alchemy.com/  -->create your first app -->select app --> view key -->copy HTTP endpoint, which is our RPC_URL that connects to sepholia testnet
//  PRIVATE_KEY is our private key from METAMASK


//   Koristimo Achemy node(čvor u blokčejnu) da se povezemo sa mrežom čvorova u realnom svetu koja pruža usluge povezivanja sa testnetom, u ovom slučaju Sepolia u pomoć koda
//   napisanog u lokalnom okruzenju    

//   --DEPLOYING TO A TESTNET OR MAINNET--



//YOU NEED TO VERIFY AND PUBLISH YOUR CODE ON ETHERSCAN.IO 

const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function main(){
    let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const abi =fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi","utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin","utf8");
    

    
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log('Deploying, please wait...');
    const contract = await contractFactory.deploy();


    const deploymentReceipt = await contract.deployTransaction.wait(1);

    console.log(`Contract deployed to ${contract.adress}`)

    let currentFavoriteNumber = await contract.retrieve();
    console.log(`Current favorite number: ${currentFavoriteNumber}`);
    console.log("Updating favorite number...");
    let transactionResponse = await contract.store("7");
    let transactionReceipt = await transactionResponse.wait();
    currentFavoriteNumber = await contract.retrieve();
    console.log(`New favorite number : ${currentFavoriteNumber}`);

}

main()
.then(() => process.exit(0))
.catch((error)=> {
console.log(error)
process.exit(1)

})

//YOU NEED TO VERIFY AND PUBLISH YOUR CONTRACT ON SEPOLIA.ETHERSCAN.IO  WHEN TRANSACTION IS OVER

//Verify and Publish --> enter address , compiler type  and Licence type (MIT), then copy and paste our local solidity to  Code section 

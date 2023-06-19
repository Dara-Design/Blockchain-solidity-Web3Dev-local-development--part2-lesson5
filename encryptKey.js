
const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()


//example of key encryption - check how you access this encrypted key in contract deploy in ethers documentation
// node encryptKey.js in terminal
//save new file .encryptedKey.json in .gitignore
//we are not gonna use this method  of encryption here , git this is just an example
async function main() {
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)

    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD,
        process.env.PRIVATE_KEY
    )
    // In later version (^6.2.3 as of this commit) of etherjs, PRIVATE_KEY is inferred from wallet, so there is no need to 
    // pass private key again. 
    //     const encryptedJsonKey = await wallet.encrypt(
    //         process.env.PRIVATE_KEY_PASSWORD,
    //  )
    console.log(encryptedJsonKey)
    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
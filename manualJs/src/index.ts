import { networks, generateMnemonic } from "qtumjs-wallet"

async function main() {
  const network = networks.testnet
  const mnemonic = generateMnemonic()
  const password = "covfefe"

  const wallet = network.fromMnemonic(mnemonic, password)

  console.log("mnemonic:", mnemonic)
  console.log("public address:", wallet.address)
  console.log("private key (WIF):", wallet.toWIF())
}

main().catch((err) => console.log(err))
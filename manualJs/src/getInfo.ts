import { networks, Wallet } from "qtumjs-wallet"

async function main() {
  const network = networks.testnet

  const privateKey = "cNzxsXywamCmFtQAGgGzsWzoktFMT8eTdUp9DYurbT69Cjy7M4ZV"

  const wallet = network.fromWIF(privateKey)
  const info = await wallet.getInfo()
  console.log(info["balance"]);
}

main().catch((err) => console.log(err))
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });

const qtumjs_wallet_1 = require("qtumjs-wallet");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const network = qtumjs_wallet_1.networks.testnet;
        const mnemonic = qtumjs_wallet_1.generateMnemonic();
        const password = "covfefe";
        const wallet = network.fromMnemonic(mnemonic, password);
        console.log("mnemonic:", mnemonic);
        console.log("public address:", wallet.address);
        console.log("private key (WIF):", wallet.toWIF());
    });
}
main().catch((err) => console.log(err));
//# sourceMappingURL=index.js.map
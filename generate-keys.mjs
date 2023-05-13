import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

const generatePrivKey = () => {
    const privKey = secp256k1.utils.randomPrivateKey();
    // console.log(privKey)// returns bytes array
    return privKey;
}

const generatePublicKey = (privKey) => {
    const pubKey = secp256k1.getPublicKey(privKey);
    // console.log(pubKey)
    return pubKey
}


export { generatePrivKey, generatePublicKey }
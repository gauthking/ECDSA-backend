import * as secp from '@noble/secp256k1';
import { hmac } from '@noble/hashes/hmac';
secp.etc.hmacSha256Sync = (k, ...m) => hmac(sha256, k, secp.etc.concatBytes(...m))
import { sha256 } from '@noble/hashes/sha256';
import { toHex } from "ethereum-cryptography/utils.js"
import crypto from 'crypto'



const hashMessage = (msg) => {
    return toHex(sha256(msg));
}

const signMessage = (hashMsg, privateKey) => {
    const sign = secp.sign(hashMsg, privateKey);
    console.log((sign))
    return sign;
}

// const hashSignature = (signature) => {
//     const signatureBuffer = Buffer.concat([
//         signature.r.toBuffer(32),
//         signature.s.toBuffer(32)
//     ]);
//     const hash = crypto.createHash('sha256').update(signatureBuffer).digest();
//     return hash.toString('hex');
// };

const verify = (signature, hashMsg, publicKey) => {
    const verify = secp.verify(signature, hashMsg, publicKey);
    return verify
}

const hexToUint8Array = (hexString) => {
    const uint8Array = new Uint8Array(33);
    for (let i = 0; i < hexString.length; i += 2) {
        uint8Array[i / 2] = parseInt(hexString.substr(i, 2), 16);
    }
    console.log(uint8Array);
    return uint8Array.toString();
}



export { hashMessage, verify, signMessage, hexToUint8Array };
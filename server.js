import express from 'express';
const app = express();
import mongoose from 'mongoose';
import cors from 'cors';
const port = 5000;
import { generatePrivKey, generatePublicKey } from "./scripts/generate-keys.mjs";
import { Users } from './models/schema.js';
import { hashMessage, hexToUint8Array, signMessage, verify } from "./scripts/helper.mjs";
import { utf8ToBytes } from "ethereum-cryptography/utils.js"
import { toHex } from "ethereum-cryptography/utils.js"
import * as dot from "dotenv"



app.use(cors());
app.use(express.json());

dot.config()
const uri = process.env.MONGOOSE_KEY;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


app.post("/createuser", async (req, res) => {
    try {
        const { name, bal } = req.body
        const privateKey = generatePrivKey();
        const publicKey = generatePublicKey(privateKey);
        console.log(toHex(privateKey))
        const body = { "userName": name, "publicKey": publicKey, "privateKey": privateKey, "balance": bal };
        const user = await Users.create(body)
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err)
    }
})

app.get("/users", async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/verifysignature", (req, res) => {
    try {
        const { msg, privateKey, publicKey } = req.body;
        const hashMsg = hashMessage(msg)
        const sign = signMessage(hashMsg, privateKey)
        const verifyUserSign = verify(sign, hashMsg, publicKey)
        if (verifyUserSign) {
            res.status(200).send({ publicKey })
        } else {
            res.status(200).send({})
        }
    } catch (err) {
        res.status(500).send(err)
    }
})

app.post("/transaction", async (req, res) => {
    const { from, to, amount } = req.body;
    const fromKey = hexToUint8Array(from)
    const toKey = hexToUint8Array(to)
    try {
        const fromUser = await Users.findOne({ publicKey: fromKey })
        const toUser = await Users.findOne({ publicKey: toKey })

        console.log(fromUser)
        console.log(toUser)

        fromUser.balance -= amount;
        toUser.balance += amount;

        await fromUser.save()
        await toUser.save()

        res.status(200).send("Updated")
    } catch (err) {
        res.status(500).send(err)
    }


})

app.get("/", (req, res) => {
    res.send("hello")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
});
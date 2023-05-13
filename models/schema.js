import * as mongoose from "mongoose"

const userSchema = mongoose.Schema({
    userName: String,
    publicKey: String,
    privateKey: String,
    balance: Number
})

const transacSchema = mongoose.Schema({
    from: String,
    to: String,
    amount: Number
})

const Users = mongoose.model('userdata', userSchema)

export { Users }
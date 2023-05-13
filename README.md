# ECDSA-backend

Frontend Repository - https://github.com/gauthking/ECDSA-Node-Project

## Overview

**This project is built for the sub course category of the Alchemy University's Ethereum Developer Roadmap - ECDSA Node**

This project demonstrates the idea of **Public-Key Cryptography** which involves the use of **Digital Signatures** triggering a variety of use cases. For one, a user can cryptographically **SIGN** a message using the ECDSA algorithm (in this project we make use of SECP256K1 library which follows the ECDSA's approach) and send it to other nodes of the network which can be used to verify the integrity of the sender who initiated the transaction, AND ALL without revealing the sender's private key!

***Below shown is the LANDING REGISTER PAGE of the Application***

![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/ff9a9940-2c43-4a7a-84a0-fe78377fff3d)

## How it Works ?

- User registers into the application as shown above ⬆️⬆️
- A `\api\createuser` request is sent to the backend express api which GENERATES a UNIQUE `Public Key` and `Private Key` using JS Modules like `secp256k1.js` which is based on the ECDSA or the Elliptical Curve Digital Signature Algorithm.
- The `Public Key`, `Private Key` and the `initial balance` set by the user is stored in the MONGOOSE DB.
- The private key generated is to be SAVED by the USER for loggin in later into the app.

![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/dce72206-f251-45a4-8392-d37ff575bbba)

- When the user logins to the application, the below interface would be renderd

![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/fbc49c7c-90ff-46db-bd28-725fe0092455)

- Here the private and public keys of the user is displayed under the account information tab.
- The account balance of the user is also given.

### Making a Transaction

- In the transaction window, paste in your public address in the `from` input and the recipient's address in the `to` input. The address of the recipient can be found in the Active Accounts window.
![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/2b29a530-94e1-4c98-8900-88ff62f71c26)

![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/3ab27ce5-10fb-4ae4-9866-5d3c18189dca)
- Enter the amount to be sent and click on the `send amount` button.
- A modal will open showing the progress of signing and verifying the transaction message. 
![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/da2d5680-67eb-4411-ac44-df51e7b56ba1)

- The new balances will get updated in the frontend. 

## Backend Process
- When the user clicks on the send amount button, first it HASHES the TRANSACTION message (which is a hardcoded transaction summary), the hashing function happens in the server side, the client only sends the original message, private key and public key of the user.
![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/f070fe86-027f-4c75-bf14-5cd58bc4133c)
![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/485f175a-4110-44a2-8e57-c05d5bbd2e31)

- After this, `sign` method of the `secp256k1` library is called which takes in 2 parameters - hashed message and private key. 
![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/53f31421-15b0-485c-bbd6-c639300e87bc)

- The sign method will emit an object as output which will contain the `r`, `s` and `recoveryKey` parameters. This object is passed as an argument to our verify function along with the hashed message and the user's public key.
![image](https://github.com/gauthking/ECDSA-backend/assets/90638995/9b2809ce-46a9-4510-9bbd-38867d4b97c2)

 - Finally our verify function first recovers the `public key` using the `signature` and `hashed message` parameters and checks whether it is equal to the public key that we passed to the verify function as the third argument. IF it matches, then it returns TRUE else FALSE. 
 -  The API will send the public key back to our client if the verify function returns true and in the frontend, with that response, we display whether the transaction has INITIATED by the current user or not. 
 -  **IN THE ABOVE STEP** is how in a distributed network, the nodes **VERIFY** whether a particular transaction was initiated by a **NODE** of the network.



import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import 'dotenv/config'; // or require('dotenv').config();

const requestMethod = "GET";
const requestHost = "api.coinbase.com";
const requestPath = "/api/v3/brokerage/products";
const algorithm = "ES256";

const uri = `${requestMethod} ${requestHost}${requestPath}`;

const KEY_SECRET = process.env.COINBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

// if (!KEY_SECRET) {
//   throw new Error("PRIVATE_KEY environment variable is required!");
// }

// const privateKey = crypto.createPrivateKey({
//   key: KEY_SECRET,
//   format: "pem",
// });

export function generateJWT() {
  const payload = { sub: "user123" };
  // @ts-ignore
  const token = jwt.sign(payload, KEY_SECRET, {
    algorithm: "ES256",       // must match key type
    expiresIn: "1h",
    header: {
      kid: process.env.KEY_ID   // optional
    }
  });
  return token;
}

// export const generateJWT = (): string => {
//   const now = Math.floor(Date.now() / 1000);

//   return jwt.sign(
//     {
//       iss: "cdp",
//       nbf: now,
//       exp: now + 120,
//       sub: process.env.COINBASE_KEY_NAME,
//       uri,
//     },
//     privateKey,
//     {
//       algorithm,
//       header: {
//         kid: process.env.COINBASE_KEY_NAME,
//       },
//     }
//   );
// };

// console.log("JWT Token Fetched Successfully");

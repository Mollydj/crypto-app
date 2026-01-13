import sodium from "libsodium-wrappers";
import base64url from "base64url";

// DEV hardcoded keys
const KEY_NAME = "e9d31b6d-baab-4978-b039-f61ae946abf0";
const KEY_SECRET = "kw5zbxmR9RkTDroZU4yYLdS4jV0KPhW3888aOALUZjaG6GqlfIT06ucPPl+jSj6jf5qA5C+5eufnoL7BZPuIFQ==";

const HOST = "api.coinbase.com";

export async function generateToken(method: string, path: string) {
  await sodium.ready;

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 120; // 2 min expiration

  const header = {
    alg: "EdDSA",
    kid: KEY_NAME,
    typ: "JWT",
  };

  const payload = {
    iss: "cdp",
    sub: KEY_NAME,
    nbf: now,
    exp,
    uri: `${method} ${HOST}${path}`,
  };

  const message =
    base64url(JSON.stringify(header)) + "." + base64url(JSON.stringify(payload));

  const privateKey = Buffer.from(KEY_SECRET, "base64");

  const signature = sodium.crypto_sign_detached(Buffer.from(message), privateKey);

  const token = `${message}.${base64url(signature)}`;
  console.log("DEV Token>>", token);
  return token;
}

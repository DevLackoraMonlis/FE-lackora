function generateNonce() {
  const head = Date.now().toString(36);
  const tail = Math.random().toString(36).substring(2);
  return Buffer.from(head + tail).toString("base64");
}

// Generate the nonce once and export it
const nonce = generateNonce();

module.exports = {
  nonce,
};

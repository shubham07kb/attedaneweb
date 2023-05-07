const crypto = require('crypto');

// Generate RSA key pair
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: { type: 'spki', format: 'pem' },
    privateKeyEncoding: { type: 'pkcs8', format: 'pem' }
});

// Function to encrypt plaintext using RSA public key
function encryptWithRSA(publicKey, plaintext) {
    const buffer = Buffer.from(plaintext);
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString('base64');
}

// Function to decrypt ciphertext using RSA private key
function decryptWithRSA(privateKey, ciphertext) {
    const buffer = Buffer.from(ciphertext, 'base64');
    const decrypted = crypto.privateDecrypt(privateKey, buffer);
    return decrypted.toString();
}

// Example usage
const plaintext = 'Hello, world!';
const ciphertext = encryptWithRSA(publicKey, plaintext);
const decryptedPlaintext = decryptWithRSA(privateKey, ciphertext);

console.log('Plaintext:', plaintext);
console.log('Ciphertext:', ciphertext);
console.log('Decrypted plaintext:', decryptedPlaintext);

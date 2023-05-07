// Generate RSA key pair
async function generateRSAKeyPair() {
    const algorithm = 'RSA-OAEP';
    const keyPair = await window.crypto.subtle.generateKey(
        { name: algorithm, modulusLength: 4096, publicExponent: new Uint8Array([1, 0, 1]), hash: { name: 'SHA-256' } },
        true,
        ['encrypt', 'decrypt']
    );
    return keyPair;
}

// Function to encrypt plaintext using RSA public key
async function encryptWithRSA(publicKey, plaintext) {
    const algorithm = 'RSA-OAEP';
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(plaintext);
    const encryptedData = await window.crypto.subtle.encrypt(
        { name: algorithm },
        publicKey,
        dataBuffer
    );
    const encryptedArray = new Uint8Array(encryptedData);
    const encryptedBase64 = btoa(String.fromCharCode.apply(null, encryptedArray));
    return encryptedBase64;
}

// Function to decrypt ciphertext using RSA private key
async function decryptWithRSA(privateKey, ciphertext) {
    const algorithm = 'RSA-OAEP';
    const encryptedArray = new Uint8Array(atob(ciphertext).split('').map(char => char.charCodeAt(0)));
    const decryptedData = await window.crypto.subtle.decrypt(
        { name: algorithm },
        privateKey,
        encryptedArray
    );
    const decoder = new TextDecoder();
    const decryptedString = decoder.decode(decryptedData);
    return decryptedString;
}

// Example usage
(async () => {
    const plaintext = 'Hello, world!';
    const keyPair = await generateRSAKeyPair();
    const publicKey = keyPair.publicKey;
    const privateKey = keyPair.privateKey;
    const ciphertext = await encryptWithRSA(publicKey, plaintext);
    const decryptedPlaintext = await decryptWithRSA(privateKey, ciphertext);

    console.log('Plaintext:', plaintext);
    console.log('Ciphertext:', ciphertext);
    console.log(privateKey);
    document.getElementById('l').innerHTML = privateKey;
    something = window.open("data:text/json," + encodeURIComponent(privateKey),
        "_blank");
    something.focus();
    console.log('Decrypted plaintext:', decryptedPlaintext);
})();

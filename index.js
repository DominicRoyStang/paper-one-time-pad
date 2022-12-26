import crypto from 'crypto';
import { encrypt, decrypt } from './encryption.js';

if (process.argv[2] === 'encrypt') {
    const utf8Message = process.argv[3];
    
    // Message as Buffer (binary representation)
    const messageBuffer = Buffer.from(utf8Message, 'utf-8');
    console.log(`UTF-8 message: ${messageBuffer.toString('utf-8')}`);

    // Generate a random key (buffer needs to be the same length as the message buffer)
    const keyBuffer = crypto.randomBytes(messageBuffer.byteLength);
    console.log(`Hexadecimal key: ${keyBuffer.toString('hex')}`);
    
    // Encrypt the message using the key
    const cipherBuffer = encrypt(messageBuffer, keyBuffer);
    console.log(`Hexadecimal cipher (encrypted with one-time pad): ${cipherBuffer.toString('hex')}`);
}

if (process.argv[2] === 'decrypt') {
    const hexCipher = process.argv[3];
    const hexKey = process.argv[4];
    
    // Cipher and key as Buffer (binary representation)
    const cipherBuffer = Buffer.from(hexCipher, 'hex');
    const keyBuffer = Buffer.from(hexKey, 'hex');

    // Decrypt the cipher using the key
    const messageBuffer = decrypt(cipherBuffer, keyBuffer);
    console.log(`Decrypted UTF-8 message: ${messageBuffer.toString('utf-8')}`);
}

if (process.argv[2] === 'help') {
    console.log('Usage:')
    console.log('node index.js encrypt \'<utf8Message>\'');
    console.log('node index.js decrypt \'<hexCipher>\' \'<hexKey>\'');
}

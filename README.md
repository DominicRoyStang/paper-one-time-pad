# Paper one-time pad

Script to encrypt a short message using one-time pad, and be able to provide the encryption key and/or cipher as handwritten text.

This is slightly harder than it would initially seem for the following reasons:

- The outputs (key and cipher) have to be in an encoding that doesn't have any whitespace/invisible characters
- The input (message) has to be in an encoding that allows whitespace (utf-8)

## Usage

Example usage
```
node index.js help
node index.js encrypt 'hello world'
node index.js decrypt 3182e77ed863fbf78a87d2 59e78b12b7438c98f8ebb6
```

This was tested on NodeJS 16.15.0

### Advanced usage notes

While one-time pads provide perfect encryption as long as the key is perfectly random and as long as the message (which is true for this example code), the key does reveal the _length_ of the message. For this reason, it is a good idea to add some random padding to your message.

You should never encrypt two messages with the same key. In the case of this script, we create a new key every time we encrypt (and don't let the user provide an encryption key) to avoid this issue.

## Implementation details

- Message to be encrypted is utf-8 string (eg. 'hello')
- Key is a hex string (eg. '68656c6c6f')
- Cipher is a hex string (eg. '68656c6c6f')

All operations are performed on Buffers (binary representations of the strings) to avoid any errors related to encodings

Eg.
```
const messageBuffer = Buffer.from(message, 'utf-8')
const keyBuffer = Buffer.from(key, 'hex')
const cipherBuffer = Buffer.from(cipher, 'hex')
```

Why hex encoding? Because we don't want any whitespace/invisible characters in the output, and it's a simple per-character encoding.

Base64 was considered, but it is less clear because there are differences between base64 and base64url, and it needs output padding when the length is not a multiple of 3. One of the goals was to make it easy for someone to create a decryption script assuming they know the character encodings used for the message, key, and cipher.

// Perform a one-time pad on buffers
export const oneTimePad = (dataBuffer, keyBuffer) => {  
    // XOR the data with the key
    const resultBuffer = Buffer.alloc(dataBuffer.length);
    for (let i = 0; i < dataBuffer.length; i++) {
        resultBuffer[i] = dataBuffer[i] ^ keyBuffer[i];
    }

    // Return the resulting buffer
    return resultBuffer;
}

// Required preparation: convert utf-8 message to buffer, generate key buffer (same length as message)
export const encrypt = (messageBuffer, keyBuffer) => {
    return oneTimePad(messageBuffer, keyBuffer);
};

// Required preparation: convert ciphertText to buffer, convert key to buffer
export const decrypt = (ciphertTextBuffer, keyBuffer) => {
    return oneTimePad(ciphertTextBuffer, keyBuffer);
};

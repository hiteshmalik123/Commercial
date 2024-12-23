import crypto from 'crypto'

// Generate a 256-bit (32 bytes) random secret key
const secretKey = crypto.randomBytes(32).toString('hex');

console.log('Generated Secret Key:', secretKey);

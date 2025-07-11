// Function to generate RSA keys using primes p and q
function generateRSAKeys(p, q) {
    const n = BigInt(p) * BigInt(q);
    const phi = (BigInt(p) - 1n) * (BigInt(q) - 1n);

    do {
        e = BigInt(Math.floor(Math.random() * (Number(phi) - 2)) + 2); // Random e in range [2, φ(n) - 1]
    } while (gcd(e, phi) !== 1n);

    const d = modInverse(e, phi);

    return { n, e, d };
}

// Function to calculate gcd (Greatest Common Divisor) using the Euclidean Algorithm
function gcd(a, b) {
    while (b !== 0n) {
        const temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

// Function to calculate modular inverse using the Extended Euclidean Algorithm
function modInverse(a, m) {
    let m0 = m, t, q;
    let x0 = 0n, x1 = 1n;

    if (m === 1n) return 0n;

    while (a > 1n) {
        q = a / m;
        t = m;

        // m is remainder now, process same as Euclid's algorithm
        m = a % m;
        a = t;
        t = x0;

        x0 = x1 - q * x0;
        x1 = t;
    }

    if (x1 < 0n) x1 += m0;

    return x1;
}


// Function to encrypt a message using RSA
function rsaEncrypt(message, publicKey) {
    const { e, n } = publicKey; 
    const chunkSize = Math.max(1, Math.floor(n.toString().length / 3) - 1); 
    const messageChunks = [...message].map(char => char.charCodeAt(0).toString().padStart(3, '0')).join('').match(new RegExp(`.{1,${chunkSize}}`, 'g')); // Split message into chunks

    const encryptedChunks = messageChunks.map(chunk => {
        const messageCode = BigInt(chunk); 
        if (messageCode >= n) {
            throw new Error("Message chunk is too long for the key size.");
        }
        const encrypted = messageCode ** BigInt(e) % BigInt(n); 
        return encrypted.toString().padStart(n.toString().length, '0');
    });

    return encryptedChunks.join(''); 
}

// Function to decrypt a message using RSA
function rsaDecrypt(encryptedMessage, privateKey) {
    const { d, n } = privateKey;
    const bigD = BigInt(d);
    const bigN = BigInt(n);

    const chunkSize = bigN.toString().length;
    const encryptedChunks = encryptedMessage.match(new RegExp(`.{1,${chunkSize}}`, 'g'));

    let messageCode = '';

    encryptedChunks.forEach(chunk => {
        const encryptedCode = BigInt(chunk);
        const decrypted = encryptedCode ** bigD % bigN;
        messageCode += decrypted.toString();
    });

    const characters = messageCode.match(/.{1,3}/g).map(code => String.fromCharCode(Number(code)));

    return characters.join('');
}

export { generateRSAKeys, rsaEncrypt, rsaDecrypt };


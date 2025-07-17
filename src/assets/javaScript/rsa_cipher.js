// Function to check if a number is prime
function isPrime(num) {
    const n = BigInt(num);
    if (n < 2n) return false;
    if (n === 2n) return true;
    if (n % 2n === 0n) return false;
    
    for (let i = 3n; i * i <= n; i += 2n) {
        if (n % i === 0n) return false;
    }
    return true;
}

// Function to generate RSA keys using primes p and q with cycling capability
function generateRSAKeys(p, q, attempt = 0) {
    const bigP = BigInt(p);
    const bigQ = BigInt(q);
    
    // Validate that p and q are prime
    if (!isPrime(bigP)) {
        throw new Error(`${p} is not a prime number`);
    }
    if (!isPrime(bigQ)) {
        throw new Error(`${q} is not a prime number`);
    }
    if (bigP === bigQ) {
        throw new Error('p and q must be different prime numbers');
    }
    
    const n = bigP * bigQ;
    const phi = (bigP - 1n) * (bigQ - 1n);
    
    // Extended array of e values to try, including more options
    const commonEValues = [3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n, 101n, 103n, 107n, 109n, 113n, 127n, 131n, 137n, 139n, 149n, 151n, 157n, 163n, 167n, 173n, 179n, 181n, 191n, 193n, 197n, 199n, 211n, 223n, 227n, 229n, 233n, 239n, 241n, 251n, 257n, 263n, 269n, 271n, 277n, 281n, 283n, 293n, 307n, 311n, 313n, 317n, 331n, 337n, 347n, 349n, 353n, 359n, 367n, 373n, 379n, 383n, 389n, 397n, 401n, 409n, 419n, 421n, 431n, 433n, 439n, 443n, 449n, 457n, 461n, 463n, 467n, 479n, 487n, 491n, 499n, 503n, 509n, 521n, 523n, 541n, 547n, 557n, 563n, 569n, 571n, 577n, 587n, 593n, 599n, 601n, 607n, 613n, 617n, 619n, 631n, 641n, 643n, 647n, 653n, 659n, 661n, 673n, 677n, 683n, 691n, 701n, 709n, 719n, 727n, 733n, 739n, 743n, 751n, 757n, 761n, 769n, 773n, 787n, 797n, 809n, 811n, 821n, 823n, 827n, 829n, 839n, 853n, 857n, 859n, 863n, 877n, 881n, 883n, 887n, 907n, 911n, 919n, 929n, 937n, 941n, 947n, 953n, 967n, 971n, 977n, 983n, 991n, 997n, 1009n, 1013n, 1019n, 1021n, 1031n, 1033n, 1039n, 1049n, 1051n, 1061n, 1063n, 1069n, 1087n, 1091n, 1093n, 1097n, 1103n, 1109n, 1117n, 1123n, 1129n, 1151n, 1153n, 1163n, 1171n, 1181n, 1187n, 1193n, 1201n, 1213n, 1217n, 1223n, 1229n, 1231n, 1237n, 1249n, 1259n, 1277n, 1279n, 1283n, 1289n, 1291n, 1297n, 1301n, 1303n, 1307n, 1319n, 1321n, 1327n, 1361n, 1367n, 1373n, 1381n, 1399n, 1409n, 1423n, 1427n, 1429n, 1433n, 1439n, 1447n, 1451n, 1453n, 1459n, 1471n, 1481n, 1483n, 1487n, 1489n, 1493n, 1499n, 1511n, 1523n, 1531n, 1543n, 1549n, 1553n, 1559n, 1567n, 1571n, 1579n, 1583n, 1597n, 1601n, 1607n, 1609n, 1613n, 1619n, 1621n, 1627n, 1637n, 1657n, 1663n, 1667n, 1669n, 1693n, 1697n, 1699n, 1709n, 1721n, 1723n, 1733n, 1741n, 1747n, 1753n, 1759n, 1777n, 1783n, 1787n, 1789n, 1801n, 1811n, 1823n, 1831n, 1847n, 1861n, 1867n, 1871n, 1873n, 1877n, 1879n, 1889n, 1901n, 1907n, 1913n, 1931n, 1933n, 1949n, 1951n, 1973n, 1979n, 1987n, 1993n, 1997n, 1999n, 2003n, 2011n, 2017n, 2027n, 2029n, 2039n, 2053n, 2063n, 2069n, 2081n, 2083n, 2087n, 2089n, 2099n, 2111n, 2113n, 2129n, 2131n, 2137n, 2141n, 2143n, 2153n, 2161n, 2179n, 2203n, 2207n, 2213n, 2221n, 2237n, 2239n, 2243n, 2251n, 2267n, 2269n, 2273n, 2281n, 2287n, 2293n, 2297n, 2309n, 2311n, 2333n, 2339n, 2341n, 2347n, 2351n, 2357n, 2371n, 2377n, 2381n, 2383n, 2389n, 2393n, 2399n, 2411n, 2417n, 2423n, 2437n, 2441n, 2447n, 2459n, 2467n, 2473n, 2477n, 2503n, 2521n, 2531n, 2539n, 2543n, 2549n, 2551n, 2557n, 2579n, 2591n, 2593n, 2609n, 2617n, 2621n, 2633n, 2647n, 2657n, 2659n, 2663n, 2671n, 2677n, 2683n, 2687n, 2689n, 2693n, 2699n, 2707n, 2711n, 2713n, 2719n, 2729n, 2731n, 2741n, 2749n, 2753n, 2767n, 2777n, 2789n, 2791n, 2797n, 2801n, 2803n, 2819n, 2833n, 2837n, 2843n, 2851n, 2857n, 2861n, 2879n, 2887n, 2897n, 2903n, 2909n, 2917n, 2927n, 2939n, 2953n, 2957n, 2963n, 2969n, 2971n, 2999n, 3001n, 3011n, 3019n, 3023n, 3037n, 3041n, 3049n, 3061n, 3067n, 3079n, 3083n, 3089n, 3109n, 3119n, 3121n, 3137n, 3163n, 3167n, 3169n, 3181n, 3187n, 3191n, 3203n, 3209n, 3217n, 3221n, 3229n, 3251n, 3253n, 3257n, 3259n, 3271n, 3299n, 3301n, 3307n, 3313n, 3319n, 3323n, 3329n, 3331n, 3343n, 3347n, 3359n, 3361n, 3371n, 3373n, 3389n, 3391n, 3407n, 3413n, 3433n, 3449n, 3457n, 3461n, 3463n, 3467n, 3469n, 3491n, 3499n, 3511n, 3517n, 3527n, 3529n, 3533n, 3539n, 3541n, 3547n, 3557n, 3559n, 3571n, 3581n, 3583n, 3593n, 3607n, 3613n, 3617n, 3623n, 3631n, 3637n, 3643n, 3659n, 3671n, 3673n, 3677n, 3691n, 3697n, 3701n, 3709n, 3719n, 3727n, 3733n, 3739n, 3761n, 3767n, 3769n, 3779n, 3793n, 3797n, 3803n, 3821n, 3823n, 3833n, 3847n, 3851n, 3853n, 3863n, 3877n, 3881n, 3889n, 3907n, 3911n, 3917n, 3919n, 3923n, 3929n, 3931n, 3943n, 3947n, 3967n, 3989n, 4001n, 4003n, 4007n, 4013n, 4019n, 4021n, 4027n, 4049n, 4051n, 4057n, 4073n, 4079n, 4091n, 4093n, 4099n, 4111n, 4127n, 4129n, 4133n, 4139n, 4153n, 4157n, 4159n, 4177n, 4201n, 4211n, 4217n, 4219n, 4229n, 4231n, 4241n, 4243n, 4253n, 4259n, 4261n, 4271n, 4273n, 4283n, 4289n, 4297n, 4327n, 4337n, 4339n, 4349n, 4357n, 4363n, 4373n, 4391n, 4397n, 4409n, 4421n, 4423n, 4441n, 4447n, 4451n, 4457n, 4463n, 4481n, 4483n, 4493n, 4507n, 4513n, 4517n, 4519n, 4523n, 4547n, 4549n, 4561n, 4567n, 4583n, 4591n, 4597n, 4603n, 4621n, 4637n, 4639n, 4643n, 4649n, 4651n, 4657n, 4663n, 4673n, 4679n, 4691n, 4703n, 4721n, 4723n, 4729n, 4733n, 4751n, 4759n, 4783n, 4787n, 4789n, 4793n, 4799n, 4801n, 4813n, 4817n, 4831n, 4861n, 4871n, 4877n, 4889n, 4903n, 4909n, 4919n, 4931n, 4933n, 4937n, 4943n, 4951n, 4957n, 4967n, 4969n, 4973n, 4987n, 4993n, 4999n, 5003n, 5009n, 5011n, 5021n, 5023n, 5039n, 5051n, 5059n, 5077n, 5081n, 5087n, 5099n, 5101n, 5107n, 5113n, 5119n, 5147n, 5153n, 5167n, 5171n, 5179n, 5189n, 5197n, 5209n, 5227n, 5231n, 5233n, 5237n, 5261n, 5273n, 5279n, 5281n, 5297n, 5303n, 5309n, 5323n, 5333n, 5347n, 5351n, 5381n, 5387n, 5393n, 5399n, 5407n, 5413n, 5417n, 5419n, 5431n, 5437n, 5441n, 5443n, 5449n, 5471n, 5477n, 5479n, 5483n, 5501n, 5503n, 5507n, 5519n, 5521n, 5527n, 5531n, 5557n, 5563n, 5569n, 5573n, 5581n, 5591n, 5623n, 5639n, 5641n, 5647n, 5651n, 5653n, 5657n, 5659n, 5669n, 5683n, 5689n, 5693n, 5701n, 5711n, 5717n, 5737n, 5741n, 5743n, 5749n, 5779n, 5783n, 5787n, 5791n, 5801n, 5807n, 5813n, 5821n, 5827n, 5839n, 5843n, 5849n, 5851n, 5857n, 5861n, 5867n, 5869n, 5879n, 5881n, 5897n, 5903n, 5923n, 5927n, 5939n, 5953n, 5981n, 5987n, 6007n, 6011n, 6029n, 6037n, 6043n, 6047n, 6053n, 6067n, 6073n, 6079n, 6089n, 6091n, 6101n, 6113n, 6121n, 6131n, 6133n, 6143n, 6151n, 6163n, 6173n, 6197n, 6199n, 6203n, 6211n, 6217n, 6221n, 6229n, 6247n, 6257n, 6263n, 6269n, 6271n, 6277n, 6287n, 6299n, 6301n, 6311n, 6317n, 6323n, 6329n, 6337n, 6343n, 6353n, 6359n, 6361n, 6367n, 6373n, 6379n, 6389n, 6397n, 6421n, 6427n, 6449n, 6451n, 6469n, 6473n, 6481n, 6491n, 6521n, 6529n, 6547n, 6551n, 6553n, 6563n, 6569n, 6571n, 6577n, 6581n, 6599n, 6607n, 6619n, 6637n, 6653n, 6659n, 6661n, 6673n, 6679n, 6689n, 6691n, 6701n, 6703n, 6709n, 6719n, 6733n, 6737n, 6761n, 6763n, 6779n, 6781n, 6791n, 6793n, 6803n, 6823n, 6827n, 6829n, 6833n, 6841n, 6857n, 6863n, 6869n, 6871n, 6883n, 6899n, 6907n, 6911n, 6917n, 6947n, 6949n, 6959n, 6961n, 6967n, 6971n, 6977n, 6983n, 6991n, 6997n, 7001n, 7013n, 7019n, 7027n, 7039n, 7043n, 7057n, 7069n, 7079n, 7103n, 7109n, 7121n, 7127n, 7129n, 7151n, 7159n, 7177n, 7187n, 7193n, 7207n, 7211n, 7213n, 7219n, 7229n, 7237n, 7243n, 7247n, 7253n, 7283n, 7297n, 7307n, 7309n, 7321n, 7331n, 7333n, 7349n, 7351n, 7369n, 7393n, 7411n, 7417n, 7433n, 7451n, 7457n, 7459n, 7477n, 7481n, 7487n, 7489n, 7499n, 7507n, 7517n, 7523n, 7529n, 7537n, 7541n, 7547n, 7549n, 7559n, 7561n, 7573n, 7577n, 7583n, 7589n, 7591n, 7603n, 7607n, 7621n, 7639n, 7643n, 7649n, 7669n, 7673n, 7681n, 7687n, 7691n, 7699n, 7703n, 7717n, 7723n, 7727n, 7741n, 7753n, 7757n, 7759n, 7789n, 7793n, 7817n, 7823n, 7829n, 7841n, 7853n, 7867n, 7873n, 7877n, 7879n, 7883n, 7901n, 7907n, 7919n, 65537n];
    
    let validEValues = [];
    let warnings = [];
    
    // Find all valid e values
    for (const candidateE of commonEValues) {
        if (candidateE < phi && gcd(candidateE, phi) === 1n) {
            validEValues.push(candidateE);
        }
    }
    
    // If no valid e values found, generate some
    if (validEValues.length === 0) {
        let candidateE = 3n;
        while (candidateE < phi && validEValues.length < 10) {
            if (gcd(candidateE, phi) === 1n) {
                validEValues.push(candidateE);
            }
            candidateE += 2n; // Only check odd numbers
        }
    }
    
    if (validEValues.length === 0) {
        throw new Error('Cannot find suitable e value. Try different prime numbers.');
    }
    
    // Cycle through different e values based on attempt number
    const eIndex = attempt % validEValues.length;
    const e = validEValues[eIndex];
    
    // Add information about cycling
    if (validEValues.length > 1) {
        warnings.push(`Key Set ${attempt + 1}: Using e = ${e} (${validEValues.length} valid options available)`);
    }
    
    // Add warnings for small values
    if (e === 2n) {
        warnings.push('!Security Warning: e = 2 is not secure and may cause issues');
    } else if (e === 3n) {
        warnings.push('!Note: e = 3 is small but acceptable for educational purposes');
    } else if (e <= 17n) {
        warnings.push(`!Note: e = ${e} is relatively small but commonly used`);
    }
    
    // Warning for small modulus
    if (n < 100n) {
        warnings.push('! Security Warning: Small modulus (n < 100) is not secure for real use');
    }
    
    // Warning for small phi
    if (phi < 10n) {
        warnings.push('!Warning: Very small phi value may limit encryption capability');
    }
    
    // Add cycling tip
    if (validEValues.length > 1) {
        warnings.push(`*Tip: Click "Generate Key" again to cycle through ${validEValues.length} different key combinations`);
    }
    
    const d = modInverse(e, phi);
    
    // Validate the key pair
    const test = (e * d) % phi;
    if (test !== 1n) {
        throw new Error('Invalid key pair generated. Please try again.');
    }
    
    return { 
        n, 
        e, 
        d, 
        warnings, 
        attempt: attempt + 1,
        totalOptions: validEValues.length,
        allValidE: validEValues.slice(0, 10) // Show first 10 options
    };
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
    if (!message || typeof message !== 'string') {
        throw new Error('Message must be a non-empty string');
    }
    
    const { e, n } = publicKey;
    const bigE = BigInt(e);
    const bigN = BigInt(n);
    
    if (bigN <= 1n || bigE <= 1n) {
        throw new Error('Invalid public key values');
    }
    
    // Calculate maximum safe value that can be encrypted
    const maxValue = bigN - 1n;
    const maxValueStr = maxValue.toString();
    
    // Calculate safe chunk size (number of digits we can safely encrypt)
    const maxChunkSize = Math.max(1, maxValueStr.length - 1);
    
    // Convert message to padded character codes
    const messageNumbers = [...message].map(char => {
        const code = char.charCodeAt(0);
        if (code > 255) {
            throw new Error(`Character '${char}' is not supported (code: ${code})`);
        }
        return code.toString().padStart(3, '0');
    }).join('');
    
    // Split into fixed-size chunks that fit safely in our key size
    const chunks = [];
    for (let i = 0; i < messageNumbers.length; i += maxChunkSize) {
        chunks.push(messageNumbers.slice(i, i + maxChunkSize));
    }
    
    // Encrypt each chunk
    const encryptedChunks = chunks.map(chunk => {
        const chunkNum = BigInt(chunk);
        if (chunkNum >= bigN) {
            throw new Error(`Message chunk ${chunk} is too large for key size ${bigN}`);
        }
        const encrypted = chunkNum ** bigE % bigN;
        return encrypted.toString();
    });
    
    // Join with separator to maintain chunk boundaries
    return encryptedChunks.join('|');
}

// Function to decrypt a message using RSA
function rsaDecrypt(encryptedMessage, privateKey) {
    if (!encryptedMessage || typeof encryptedMessage !== 'string') {
        throw new Error('Encrypted message must be a non-empty string');
    }
    
    const { d, n } = privateKey;
    const bigD = BigInt(d);
    const bigN = BigInt(n);
    
    if (bigN <= 1n || bigD <= 1n) {
        throw new Error('Invalid private key values');
    }
    
    // Split encrypted message by separator
    const encryptedChunks = encryptedMessage.split('|');
    
    if (encryptedChunks.length === 0) {
        throw new Error('No valid chunks found in encrypted message');
    }
    
    // Decrypt each chunk
    let decryptedNumbers = '';
    for (const chunk of encryptedChunks) {
        if (chunk.trim() === '') continue;
        
        try {
            const chunkNum = BigInt(chunk);
            const decrypted = chunkNum ** bigD % bigN;
            decryptedNumbers += decrypted.toString();
        } catch (error) {
            throw new Error(`Failed to decrypt chunk: ${chunk}`);
        }
    }
    
    // Convert back to characters
    const characters = [];
    for (let i = 0; i < decryptedNumbers.length; i += 3) {
        const codeStr = decryptedNumbers.slice(i, i + 3);
        if (codeStr.length === 3) {
            const charCode = parseInt(codeStr, 10);
            if (charCode >= 0 && charCode <= 255) {
                characters.push(String.fromCharCode(charCode));
            } else {
                console.warn(`Invalid character code: ${charCode}`);
            }
        }
    }
    
    const result = characters.join('');
    if (result === '') {
        throw new Error('Decryption resulted in empty message. Check your keys and encrypted data.');
    }
    
    return result;
}

export { isPrime, generateRSAKeys, rsaEncrypt, rsaDecrypt };


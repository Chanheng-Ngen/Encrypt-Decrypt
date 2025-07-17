import { setupCaesarCipher } from './encrypt_decrypt.js';
import { generateRSAKeys, rsaEncrypt, rsaDecrypt } from './rsa_cipher.js';

window.addEventListener('DOMContentLoaded', () => {
    setupCaesarCipher();

    // RSA key generation with cycling capability
    const pInput = document.getElementById('primeOne');
    const qInput = document.getElementById('primeSeconde');
    const btn = document.getElementById('btnGenerate');
    const result = document.getElementById('rsaResult');
    
    // Track generation attempts for cycling
    let generationAttempt = 0;
    let lastPValue = null;
    let lastQValue = null;

    btn.addEventListener('click', () => {
        try {
            // Clear previous results
            result.classList.remove('text-success', 'text-error', 'text-warning');
            
            // Validate inputs
            const pValue = pInput.value.trim();
            const qValue = qInput.value.trim();
            
            if (!pValue || !qValue) {
                const errorMsg = 'Please enter both prime numbers p and q.';
                result.textContent = errorMsg;
                result.classList.add('text-error');
                generationAttempt = 0; // Reset attempt counter
                return;
            }
            
            // Check if p and q values changed - reset attempt counter if so
            if (pValue !== lastPValue || qValue !== lastQValue) {
                generationAttempt = 0;
                lastPValue = pValue;
                lastQValue = qValue;
            }
            
            // Convert to BigInt
            let p, q;
            try {
                p = BigInt(pValue);
                q = BigInt(qValue);
            } catch (conversionError) {
                const errorMsg = 'Please enter valid integer values for p and q.';
                result.textContent = errorMsg;
                result.classList.add('text-error');
                generationAttempt = 0; // Reset attempt counter
                return;
            }
            
            if (p <= 1n || q <= 1n) {
                const errorMsg = 'Both p and q must be greater than 1.';
                result.textContent = errorMsg;
                result.classList.add('text-error');
                generationAttempt = 0; // Reset attempt counter
                return;
            }
            
            // Generate RSA keys with current attempt number
            const keyResult = generateRSAKeys(p, q, generationAttempt);
            const { n, e, d, warnings, attempt, totalOptions, allValidE } = keyResult;
            
            // Increment attempt counter for next click
            generationAttempt++;
            
            // Create result text
            let resultText = `RSA Key Generation Result #${attempt}\n\n`;
            resultText += `Public Key: (e: ${e}, n: ${n})\n`;
            resultText += `Private Key: (d: ${d}, n: ${n})\n\n`;
            
            // Show available options
            if (totalOptions > 1) {
                resultText += `Available Options: ${totalOptions} different key combinations\n`;
                resultText += `First 10 valid e values: ${allValidE.slice(0, 10).join(', ')}\n\n`;
            }
            
            // Add warnings if any
            if (warnings && warnings.length > 0) {
                resultText += `Notifications:\n`;
                warnings.forEach(warning => {
                    resultText += `• ${warning}\n`;
                });
                result.classList.add('text-warning');
            } else {
                result.classList.add('text-success');
            }
            
            result.textContent = resultText;
            
            // Console logging for debugging
            console.log(`=== RSA Key Generation #${attempt} ===`);
            console.log(`p = ${p}, q = ${q}`);
            console.log(`n = ${n}, e = ${e}, d = ${d}`);
            console.log(`Total valid e options: ${totalOptions}`);
            console.log(`Next click will show key set #${generationAttempt + 1}`);
            
            if (warnings.length > 0) {
                console.warn('Warnings:', warnings);
            }
                  
        } catch (error) {
            console.error('RSA Key Generation Error:', error);
            const errorMsg = `Error: ${error.message}`;
            result.textContent = errorMsg;
            result.classList.add('text-error');
            
            // Reset attempt counter on error
            generationAttempt = 0;
        }
    });

    // RSA encryption
    const txtInput = document.getElementById('txtEn');
    const keyInput = document.getElementById('key');
    const modulusInput = document.getElementById('modulusEn');
    const btnEncrypt = document.getElementById('btnRSAEncrypt');
    const resultEncrypt = document.getElementById('rsaEncResult');

    btnEncrypt.addEventListener('click', () => {
        try {
            // Clear previous results
            resultEncrypt.classList.remove('text-success', 'text-error');
            
            const message = txtInput.value.trim();
            const eValue = keyInput.value.trim();
            const nValue = modulusInput.value.trim();

            if (!message) {
                const errorMsg = 'Please enter a message to encrypt.';
                resultEncrypt.textContent = errorMsg;
                resultEncrypt.classList.add('text-error');
                return;
            }
            
            if (!eValue || !nValue) {
                const errorMsg = 'Please provide both public key (e) and modulus (n).';
                resultEncrypt.textContent = errorMsg;
                resultEncrypt.classList.add('text-error');
                return;
            }
            
            // Convert to numbers with better validation
            const e = parseInt(eValue, 10);
            const n = parseInt(nValue, 10);
            
            if (isNaN(e) || isNaN(n) || e <= 0 || n <= 0) {
                const errorMsg = 'Please provide valid positive numbers for e and n.';
                resultEncrypt.textContent = errorMsg;
                resultEncrypt.classList.add('text-error');
                return;
            }
            
            // Warning for small keys
            if (n < 100) {
                console.warn('Warning: Small key size (n < 100) may not work well with long messages.');
            }
            
            // Warning for long messages
            if (message.length > 10 && n < 1000) {
                console.warn('Warning: Long message with small key size may cause issues.');
            }

            const encryptedMessage = rsaEncrypt(message, { e, n });
            const resultText = `Encrypted Message:\n${encryptedMessage}`;
            resultEncrypt.textContent = resultText;
            resultEncrypt.classList.add('text-success');
                  
        } catch (error) {
            console.error('Encryption error:', error);
            const errorMsg = `Encryption failed: ${error.message}`;
            resultEncrypt.textContent = errorMsg;
            resultEncrypt.classList.add('text-error');
        }
    });

    // RSA decryption
    const encryptedInput = document.getElementById("txtDe");
    const dInput = document.getElementById("pKey");
    const nInput = document.getElementById("modulusDe");
    const btnDecrypt = document.getElementById("btnRSADecrypt");
    const resultDecrypt = document.getElementById("rsaDecResult");

    btnDecrypt.addEventListener('click', () => {
        try {
            // Clear previous results
            resultDecrypt.classList.remove('text-success', 'text-error');
            
            const encryptedMessage = encryptedInput.value.trim();
            const dValue = dInput.value.trim();
            const nValue = nInput.value.trim();

            if (!encryptedMessage) {
                const errorMsg = 'Please enter an encrypted message to decrypt.';
                resultDecrypt.textContent = errorMsg;
                resultDecrypt.classList.add('text-error');
                return;
            }
            
            if (!dValue || !nValue) {
                const errorMsg = 'Please provide both private key (d) and modulus (n).';
                resultDecrypt.textContent = errorMsg;
                resultDecrypt.classList.add('text-error');
                return;
            }
            
            // Convert to numbers with better validation
            const d = parseInt(dValue, 10);
            const n = parseInt(nValue, 10);
            
            if (isNaN(d) || isNaN(n) || d <= 0 || n <= 0) {
                const errorMsg = 'Please provide valid positive numbers for d and n.';
                resultDecrypt.textContent = errorMsg;
                resultDecrypt.classList.add('text-error');
                return;
            }
            
            // Check if the encrypted message contains the separator
            if (!encryptedMessage.includes('|')) {
                const errorMsg = 'Invalid encrypted message format. Please use a message encrypted with this system.';
                resultDecrypt.textContent = errorMsg;
                resultDecrypt.classList.add('text-error');
                return;
            }

            const decryptedMessage = rsaDecrypt(encryptedMessage, { d, n });
            const resultText = `Decrypted Message:\n${decryptedMessage}`;
            resultDecrypt.textContent = resultText;
            resultDecrypt.classList.add('text-success');
                  
        } catch (error) {
            console.error('Decryption error:', error);
            const errorMsg = `Decryption failed: ${error.message}`;
            resultDecrypt.textContent = errorMsg;
            resultDecrypt.classList.add('text-error');
        }
    });
});
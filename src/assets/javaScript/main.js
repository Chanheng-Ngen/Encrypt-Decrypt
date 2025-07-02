import { setupCaesarCipher } from './encrypt_decrypt.js';
import { generateRSAKeys, rsaEncrypt, rsaDecrypt } from './rsa_cipher.js';

window.addEventListener('DOMContentLoaded', () => {
    setupCaesarCipher();

    // generate key
    const pInput = document.getElementById('primeOne');
    const qInput = document.getElementById('primeSeconde');
    const btn = document.getElementById('btnGenerate');
    const result = document.getElementById('rsaResult');

    btn.addEventListener('click', () => {
        const p = BigInt(pInput.value);
        const q = BigInt(qInput.value);

        if (p <= 1n || q <= 1n) {
            result.textContent = 'Both p and q must be greater than 1.';
            return;
        }

        const { n, e, d } = generateRSAKeys(p, q);
        result.textContent = `Reuslt: Public Key (e: ${e}, n: ${n}), Private Key (d: ${d}, n: ${n})`;
    });

    // encrypt
    const txtInput = document.getElementById('txtEn');
    const keyInput = document.getElementById('key');
    const modulusInput = document.getElementById('modulusEn');
    const btnEncrypt = document.getElementById('btnRSAEncrypt');
    const resultEncrypt = document.getElementById('rsaEncResult');

    btnEncrypt.addEventListener('click', () => {
        const message = txtInput.value;
        const e = parseInt(keyInput.value, 10);
        const n = parseInt(modulusInput.value, 10);

        if (!message || isNaN(e) || isNaN(n)) {
            resultEncrypt.textContent = 'Please provide a valid message and keys.';
            return;
        }

        try {
            const encryptedMessage = rsaEncrypt(message, { e, n });
            resultEncrypt.textContent = `Result: ${encryptedMessage}`;
        } catch (error) {
            console.error('Encryption error:', error);
            resultEncrypt.textContent = 'Encryption failed. Please check your input.';
        }
    });

    // decrypt
    const encryptedInput = document.getElementById("txtDe");
    const dInput = document.getElementById("pKey");
    const nInput = document.getElementById("modulusDe");
    const btnDecrypt = document.getElementById("btnRSADecrypt");
    const resultDecrypt = document.getElementById("rsaDecResult");

    btnDecrypt.addEventListener('click', () => {
        const encryptedMessage = encryptedInput.value;
        const d = parseInt(dInput.value, 10);
        const n = parseInt(nInput.value, 10);

        if (!encryptedMessage || isNaN(d) || isNaN(n)) {
            resultDecrypt.textContent = 'Please provide a valid encrypted message and keys.';
            return;
        }

        try {
            const decryptedMessage = rsaDecrypt(encryptedMessage, { d, n });
            resultDecrypt.textContent = `Result: ${decryptedMessage}`;
        } catch (error) {
            console.error('Decryption error:', error);
            resultDecrypt.textContent = 'Decryption failed. Please check your input.';
        }
    });
});
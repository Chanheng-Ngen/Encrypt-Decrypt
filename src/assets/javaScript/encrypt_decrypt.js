
const shift = 3;

function caesarEncrypt(text, shift) {
    return text.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
            return String.fromCharCode((char.charCodeAt(0) - 97 + shift) % 26 + 97);
        } else if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode((char.charCodeAt(0) - 65 + shift) % 26 + 65);
        } else {
            return char;
        }
    }).join('');
}

function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, 26 - shift);
}

function showStatusMessage(status, message, isSuccess) {
    status.textContent = message;
    status.classList.remove('text-green-600', 'text-red-600');
    status.classList.add(isSuccess ? 'text-green-600' : 'text-red-600');
    setTimeout(() => {
        status.textContent = '';
    }, 3000);
}

export function setupCaesarCipher() {
    const input = document.getElementById('txtCaesar');
    const result = document.getElementById('result');
    const status = document.getElementById('statusMessage');
    const btnEncrypt = document.getElementById('btnEncrypt');
    const btnDecrypt = document.getElementById('btnDecrypt');

    btnEncrypt.addEventListener('click', () => {
        const text = input.value.trim();
        if (text === "") {
            showStatusMessage(status, "Please enter text to encrypt.", false);
            return;
        }
        const encrypted = caesarEncrypt(text, shift);
        result.textContent = 'Result: ' + encrypted;
        showStatusMessage(status, "Encryption successful!", true);
    });

    btnDecrypt.addEventListener('click', () => {
        const text = input.value.trim();
        if (text === "") {
            showStatusMessage(status, "Please enter text to decrypt.", false);
            return;
        }
        const decrypted = caesarDecrypt(text, shift);
        result.textContent = 'Result: ' + decrypted;
        showStatusMessage(status, "Decryption successful!", true);
    });
}

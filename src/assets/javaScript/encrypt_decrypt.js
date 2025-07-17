
function caesarEncrypt(text, shift) {
    // Normalize shift to be within 0-25 range
    const normalizedShift = ((shift % 26) + 26) % 26;
    
    return text.split('').map(char => {
        if (char >= 'a' && char <= 'z') {
            return String.fromCharCode((char.charCodeAt(0) - 97 + normalizedShift) % 26 + 97);
        } else if (char >= 'A' && char <= 'Z') {
            return String.fromCharCode((char.charCodeAt(0) - 65 + normalizedShift) % 26 + 65);
        } else {
            return char; // Non-alphabetic characters remain unchanged
        }
    }).join('');
}

function caesarDecrypt(text, shift) {
    // For decryption, we shift in the opposite direction
    return caesarEncrypt(text, -shift);
}

export function setupCaesarCipher() {
    const input = document.getElementById('txtCaesar');
    const shiftInput = document.getElementById('shiftAmount');
    const result = document.getElementById('result');
    const btnEncrypt = document.getElementById('btnEncrypt');
    const btnDecrypt = document.getElementById('btnDecrypt');

    btnEncrypt.addEventListener('click', () => {
        const text = input.value.trim();
        const shiftValue = parseInt(shiftInput.value);
        const shiftAmount = isNaN(shiftValue) ? 3 : shiftValue; // Default to 3 only if NaN
        
        if (text === "") {
            const errorMsg = "Please enter text to encrypt.";
            result.textContent = 'Result: ' + errorMsg;
            result.classList.remove('text-green-600');
            result.classList.add('text-red-600');
            return;
        }
        
        if (shiftAmount < 0 || shiftAmount > 25) {
            const errorMsg = "Shift amount must be between 0 and 25.";
            result.textContent = 'Result: ' + errorMsg;
            result.classList.remove('text-green-600');
            result.classList.add('text-red-600');
            return;
        }
        
        try {
            const encrypted = caesarEncrypt(text, shiftAmount);
            result.textContent = 'Result: ' + encrypted;
            result.classList.remove('text-red-600');
            result.classList.add('text-green-600');
        } catch (error) {
            const errorMsg = "Encryption failed: " + error.message;
            result.textContent = 'Result: ' + errorMsg;
            result.classList.remove('text-green-600');
            result.classList.add('text-red-600');
        }
    });

    btnDecrypt.addEventListener('click', () => {
        const text = input.value.trim();
        const shiftValue = parseInt(shiftInput.value);
        const shiftAmount = isNaN(shiftValue) ? 3 : shiftValue; // Default to 3 only if NaN
        
        if (text === "") {
            const errorMsg = "Please enter text to decrypt.";
            result.textContent = 'Result: ' + errorMsg;
            result.classList.remove('text-green-600');
            result.classList.add('text-red-600');
            return;
        }
        
        if (shiftAmount < 0 || shiftAmount > 25) {
            const errorMsg = "Shift amount must be between 0 and 25.";
            result.textContent = 'Result: ' + errorMsg;
            result.classList.remove('text-green-600');
            result.classList.add('text-red-600');
            return;
        }
        
        try {
            const decrypted = caesarDecrypt(text, shiftAmount);
            result.textContent = 'Result: ' + decrypted;
            result.classList.remove('text-red-600');
            result.classList.add('text-green-600');
        } catch (error) {
            const errorMsg = "Decryption failed: " + error.message;
            result.textContent = 'Result: ' + errorMsg;
            result.classList.remove('text-green-600');
            result.classList.add('text-red-600');
        }
    });
}

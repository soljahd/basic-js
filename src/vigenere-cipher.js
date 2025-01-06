const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  encrypt(message, key) {
    return this.process(message, key, true);
  }

  decrypt(message, key) {
    return this.process(message, key, false);
  }

  process(message, key, encrypt) {
    if (!message || !key) throw new Error('Incorrect arguments!');
    message = message.toUpperCase();
    key = key.toUpperCase();
    let result = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i += 1) {
      const char = message[i];
      if (this.alphabet.includes(char)) {
        const charCode = this.alphabet.indexOf(char);
        const keyChar = key[keyIndex % key.length];
        const keyCode = this.alphabet.indexOf(keyChar);
        let fullCharCode;
        if (encrypt === true) {
          fullCharCode = (charCode + keyCode) % 26;
        } else if (encrypt === false) {
          fullCharCode = (charCode - keyCode + 26) % 26;
        }
        result += this.alphabet[fullCharCode];
        keyIndex += 1;
      } else {
        result += char;
      }
    }

    if (this.direct === true) {
      return result;
    } else if (this.direct === false) {
      return result.split('').reverse().join('');
    }
  }
}

module.exports = {
  VigenereCipheringMachine
};

import CryptoJS from 'crypto-js';

function uniqueID() {
    function chr4() {
        return Math.random().toString(16).slice(-4);
    }
    return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}

// not a 100% secure here since Math.random() is not considered a good source to start generating session ids from.
const sessionId = () => CryptoJS.SHA256(uniqueID()).toString(CryptoJS.enc.Base64);

export default sessionId;
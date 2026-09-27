const form = document.getElementById("signupForm");
const encryptedBox = document.getElementById("encrypted");
const decryptedBox = document.getElementById("decrypted");

let rsa = new JSEncrypt({
    default_key_size: RSA_BITS
});

rsa.getKey();

const publicKey = rsa.getPublicKey();
const privateKey = rsa.getPrivateKey();

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const dob = document.getElementById("dob").value;
    const yearlevel = document.getElementById("yearlevel").value;
    const gender = document.getElementById("gender").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData =
        "Full Name: " + fullname +
        "\nDate of Birth: " + dob +
        "\nYear Level: " + yearlevel +
        "\nGender: " + gender +
        "\nUsername: " + username +
        "\nPassword: " + password;

    rsa.setPublicKey(publicKey);

    const encrypted = rsa.encrypt(userData);

    if (!encrypted) {
        encryptedBox.value = "Encryption failed.";
        return;
    }

    encryptedBox.value = encrypted;

    rsa.setPrivateKey(privateKey);

    const decrypted = rsa.decrypt(encrypted);

    if (!decrypted) {
        decryptedBox.value = "Decryption failed.";
        return;
    }

    decryptedBox.value = decrypted;
});
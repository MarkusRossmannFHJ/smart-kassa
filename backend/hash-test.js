// This script is just to create a password hash for testing purposes.
// May be extended do automatically store hash in db.

import argon2 from "argon2";

async function createHash() {
    const password = "";
    try {
        const hash = await argon2.hash(password);
        console.log("Argon2-Hash:", hash);
    } catch (err) {
        console.error(err);
    }
}

createHash();

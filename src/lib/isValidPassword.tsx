/*
file that holds the function that checks if admin password is
valid
*/

export async function isValidPassword(password: string,
    hashedPassword: string) {

        console.log(await hashPassword(password))
        return await hashPassword(password) === hashedPassword
    }


// function to encrypt password(make it secure)
async function hashPassword(password: string) {
    const arrayBuffer = await crypto.subtle.digest("SHA-512", 
        new TextEncoder().encode(password))

        return Buffer.from(arrayBuffer).toString("base64")
}
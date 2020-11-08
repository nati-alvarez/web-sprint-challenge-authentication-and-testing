const db = require("db");
const bcrypt = require("bcyrptjs");
module.exports = {
    getByUsername,
    createUser
}

async function getByUsername(username){
    return await db("users").where({username}).first();
}

async function createUser(username, password){
    const hash = bcrypt.hashSync(password, 14);
    return await db("users").insert({username, hash});
}
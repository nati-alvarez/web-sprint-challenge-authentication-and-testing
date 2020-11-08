const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
let jwt;

afterAll(async()=>{
    db.destroy();
})

describe("/jokes GET endpoint", ()=>{
    beforeEach(async()=>{
        const res = await request(server).post("/api/auth/login").send({username: "Bob", password: "password"});
        console.log(res.body)
        jwt = res.body.token;
    });

    it("Returns status code 200", async()=>{
        const res = await request(server).get("/api/jokes").set("Authorization", jwt);
        expect(res.status).toBe(200);
    });

    it("Returns an array of jokes", async()=>{
        const res = await request(server).get("/api/jokes").set("Authorization", jwt);
        expect(Array.isArray(res.body)).toBe(true);
    })
})

const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");
let jwt;

describe("/jokes GET endpoint", ()=>{
    beforeEach(async()=>{
        await db.seed.run();
    });
    afterEach(async()=>{
        await db.seed.run();
    });

    it("Returns status code 200", async()=>{
        const res1 = await request(server).post("/api/auth/login").send({username: "Bob", password: "password"});
        console.log(res1.body)
        jwt = res1.body.token;
        const res = await request(server).get("/api/jokes").set("Authorization", jwt);
        expect(res.status).toBe(200);
    });

    it("Returns an array of jokes", async()=>{
        const res1 = await request(server).post("/api/auth/login").send({username: "Bob", password: "password"});
        console.log(res1.body)
        jwt = res1.body.token;
        const res = await request(server).get("/api/jokes").set("Authorization", jwt);
        expect(Array.isArray(res.body)).toBe(true);
    })
})

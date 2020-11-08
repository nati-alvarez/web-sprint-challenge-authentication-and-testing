const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig");

describe("Register route tests", ()=>{
    beforeEach(async ()=>{
        await db.seed.run();
    });

    afterAll(()=>{
        db.destroy();
    })

    it("Should return 400 if username and password not given", async()=>{
        let res = await request(server).post("/api/auth/register").send({});
        expect(res.status).toBe(400);

        res = await request(server).post("/api/auth/register").send({username: "Username"});
        expect(res.status).toBe(400);

        res = await request(server).post("/api/auth/register").send({password: "password"});
        expect(res.status).toBe(400);
    });

    it("Should return 400 if username is taken", async()=>{
        const res = await request(server).post("/api/auth/register").send({username: "Bob", password:"supersecret"});
        
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Username taken");
    });

    it("Should return 201 on successful registration", async()=>{
        const res = await request(server).post("/api/auth/register").send({username: "Me", password: "pass"});

        expect(res.status).toBe(201);
    });
});

describe("Login route tests", ()=>{
    it("Should return 400 if username or password not given", async()=>{
        let res = await request(server).post("/api/auth/login").send({});
        expect(res.status).toBe(400);

        res = await request(server).post("/api/auth/login").send({username: "Username"});
        expect(res.status).toBe(400);

        res = await request(server).post("/api/auth/login").send({password: "password"});
        expect(res.status).toBe(400);
    });

    it("Should return 401 if username or password is incorrect", async()=>{
        let res = await request(server).post("/api/auth/login").send({username: "Bob", password: "nottherightpassword"});
        expect(res.status).toBe(401);
        res = await request(server).post("/api/auth/login").send({username: "Userthatdoesntexist", password: "password"});
        expect(res.status).toBe(401);
    })
});
const chai = require("chai");
const should = chai.should();
const request = require("supertest");

const app = require("../index");

describe("Integration Tests", function() {
  it("Test:1 Query  getFortuneCookie ", async function() {
    const query = { query: "query{ getFortuneCookie }" };
    const res = await request(app)
      .post("/graphql")
      .send(query)
      .expect(200);
    res.body.data.should.have.property("getFortuneCookie");
  });

  it("Test:2 Query allAuthors before mutation ", async function() {
    const query = {
      query: `query{
                    allAuthors {
                            id
                    }
            }`
    };
    const res = await request(app)
      .post("/graphql")
      .send(query)
      .expect(200);
    res.body.data.should.have.property("allAuthors");
    res.body.data.allAuthors.should.be.an("array");
    res.body.data.allAuthors.length.should.equal(1);
  });

  it("Test:3 Mutation createAuthor ", async function() {
    const query = {
      query: `
        mutation {
                createAuthor(firstName: "ABC", lastName: "XYZ") {
                id
                }
            }
        `
    };
    const res = await request(app)
      .post("/graphql")
      .send(query)
      .expect(200);
    res.body.data.should.have.property("createAuthor");
    res.body.data.createAuthor.should.be.ok;
  });

  it("Test:4 Query allAuthors after mutation ", async function() {
    const query = {
      query: `query{
                    allAuthors {
                            id
                    }
            }`
    };
    const res = await request(app)
      .post("/graphql")
      .send(query)
      .expect(200);
    res.body.data.should.have.property("allAuthors");
    res.body.data.allAuthors.should.be.an("array");
    res.body.data.allAuthors.length.should.equal(2);
  });
});

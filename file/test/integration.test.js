const request = require("supertest");
const server = require("../dist/startUp");

let testApp;
beforeAll(() => {
  let port = process.env.PORT || "3054";
  testApp = server.default.app.listen(port);
});
afterAll(() => {
  testApp.close();
});

describe("Testing  API", () => {
  test("create server on port  3054", async () => {
    const serverPort = testApp.address().port;
    expect(serverPort).toEqual(3054);
  });

  test("should  get all  movies", async () => {
    const res = await request(testApp).get("/api/v1/movies");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
  });

  test("should  get all  movies winners interval", async () => {
    const res = await request(testApp).get("/api/v1/movies/winners");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
  });

  test("should create a new movie getBy ID ", async () => {
    const res = await request(testApp).get("/api/v1/movies/1PO1aOzQJU9CNcK8");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
  });

  test("should create a new post movie  title :new job", async () => {
    const res = await request(testApp)
      .post("/api/v1/movies")
      .send({
        year: "2019",
        title: "New job",
        studios: "Sul",
        producers: "Pedro joaquim da costa",
        winner: ""
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
  });

  test("should edit  a  movie From Justin to Kelly 23", async () => {
    const res = await request(testApp)
      .put("/api/v1/movies/1PO1aOzQJU9CNcK8")
      .send({
        year: "2020",
        title: "From Justin to Kelly 23",
        studios: "20th Century Fox",
        producers: "John Steven Agoglia",
        winner: "",
        _id: "1PO1aOzQJU9CNcK8"
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
  });

  test("should delete  a new movie By ID ", async () => {
    const res = await request(testApp).delete("/api/v1/movies/1PO1aOzQJU9CNcK8");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("result");
  });
});

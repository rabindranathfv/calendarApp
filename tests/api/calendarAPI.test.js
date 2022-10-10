import calendarApi from "./../../src/api/calendarAPI";

import "jest-localstorage-mock";
describe("Calendar API settings", () => {
  it("should load config by default", () => {
    expect(calendarApi.defaults.baseURL).toBe("http://localhost:4000/api/v1");
  });

  it("should have x-token in the headers", async () => {
    // TODO you must have backend running for pass this test or configure some url for Test api url
    const token = "token-prueba1";
    localStorage.setItem("token", token);
    const res = await calendarApi.get("/auth");
    expect(res.config.headers["x-token"]).toBe(token);
  });
});

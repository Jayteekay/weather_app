const { sortCities, classifyTemperature, convertTemperature } = require("../functions");
jest.mock("../asset-vectors-loader");

describe("functions", () => {
  describe("sortCities", () => {
    it("should sort cities in alphabetical order.", () => {
      const cities = [{ city: "C" }, { city: "B" }, { city: "D" }, { city: "A" }];
      expect(sortCities(cities)).toEqual([{ city: "A" }, { city: "B" }, { city: "C" }, { city: "D" }])
    });
  });
  describe("classifyTemperature", () => {
    it("should classify 0 as cold", ()=>{
        const temp = 0;
        expect(classifyTemperature(temp).description).toBe("Cold");
    })
    it("should classify 18 as warm", ()=>{
        const temp = 18;
        expect(classifyTemperature(temp).description).toBe("Warm");
    })
    it("should classify 28 as hot", ()=>{
        const temp = 27;
        expect(classifyTemperature(temp).description).toBe("Hot");
    })
  })
  describe("convertTemperature", () => {
    it("should return original value when no unit is passed", () => {
        const temp = 7;
        expect(convertTemperature(temp)).toBe(temp)
    })
    it("should return 44.6 when 7 and FAHRENHEIT is passed", () => {
        const temp = 7;
        const unit = "FAHRENHEIT"
        expect(convertTemperature(temp, unit)).toBe(44.6)
    })
  })
});

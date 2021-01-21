import { Builder, Capabilities, until, WebDriver } from "selenium-webdriver";
import { Expedia } from "./pageObjects/placeholder";



const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  const page = new Expedia(driver);

  describe("Expedia", ()=>{
    jest.setTimeout(30000);
    beforeEach(async () => {
      await page.navigate();
    });
    afterAll(async () => {
      await driver.quit();
    });

    test("More travel Page", async()=>{
        await driver.wait(until.elementLocated(page.moreTravel));
        await (await driver.findElement(page.moreTravel)).click();
        await driver.sleep(2000);
        await driver.wait(until.elementLocated(page.thingsToDo));
        await (await driver.findElement(page.thingsToDo)).click();
        await driver.sleep(2000);
        await page.takeScreenshot("screenShot/MoreTravelPage");
        await driver.wait(until.elementLocated(page.moretravelPage));
        expect(await (await (await driver.findElement(page.moretravelPage)).getText()).toLowerCase()).toContain("search things to do");
    })

    test("Cars Page", async()=>{
        await driver.wait(until.elementLocated(page.moreTravel));
        await (await driver.findElement(page.moreTravel)).click();
        await driver.sleep(2000);
        await driver.wait(until.elementLocated(page.cars));
        await (await driver.findElement(page.cars)).click();
        await driver.sleep(2000);
        await page.takeScreenshot("screenShot/CarPage");
        await driver.wait(until.elementLocated(page.carsPage));
        expect(await (await (await driver.findElement(page.carsPage)).getText()).toLowerCase()).toContain("search cars");
    })


})
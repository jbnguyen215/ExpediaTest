import { Builder, By, Capabilities, until, WebDriver } from "selenium-webdriver";
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

    test("Changes the Expedia.com language ", async()=>{
        
        page.languageClick();
        await driver.sleep(2000);
        page.languageDropBox();
        await driver.sleep(2000);
        page.spanishSelect();
        await driver.sleep(2000);
        page.displayClick();
        await driver.sleep(2000);
        page.lanSaveButtonClick();
        await driver.sleep(2000);
        await page.takeScreenshot("screenShot/ChangeLanguage");
        await driver.wait(until.elementLocated(By.className("uitk-type-display-700")));
        expect(await (await (await driver.findElement(By.className("uitk-type-display-700"))).getText()).toLowerCase()).toBe(
            "¿debes cambiar tus planes por el covid-19?");



    })
})
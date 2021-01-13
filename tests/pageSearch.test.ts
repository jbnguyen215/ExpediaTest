import { until } from 'selenium-webdriver';
import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { Expedia } from './pageObjects/placeholder';

const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  const page = new Expedia(driver);

  describe("Expedia", ()=>{
    jest.setTimeout(15000);
    beforeEach(async () => {
      await page.navigate();
    });
    afterAll(async () => {
      await driver.quit();
    });

    test("Flights Searching", async()=>{
        page.roundTripFlight();
        page.clickLeavingSearch();
        page.inputLeaving("Salt Lake");
        page.clickGoingSearch();
        page.inputGoing("Tokyo");
        

    })

  })
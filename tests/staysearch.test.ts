import { Builder, Capabilities, until, WebDriver } from "selenium-webdriver";
import { Expedia } from "./pageObjects/placeholder";
import * as hotels from "..//tests/hotels.json";



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

    hotels.forEach((newHotel)=>{
      test("Stay Searching", async()=>{
          page.staysClick();
          await driver.sleep(2000);
          page.staysGoing(newHotel.going);
          await driver.sleep(2000);
          page.departButtonClick()
          await driver.sleep(2000);
          page.stayCheckInDateClick();
          await driver.sleep(2000);
          page.doneButtonClick();
          await driver.sleep(2000);
          page.returnButtonClick();
          await driver.sleep(2000);
          page.stayCheckoutDateClick();
          await driver.sleep(2000);
          page.doneButtonClick();
          await driver.sleep(2000);
          page.staySearchButtonClick();
          await driver.sleep(2000);
          await page.takeScreenshot("screenShot/StayResult");
          let stay = await page.getStayResult();
          expect(stay).toContain("hilton hawaiian village waikiki beach resort");
        
        
      })
    })


})
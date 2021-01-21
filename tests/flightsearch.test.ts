import { Browser, until } from 'selenium-webdriver';
import { Builder, Capabilities, WebDriver } from 'selenium-webdriver';
import { Expedia } from './pageObjects/placeholder';
import * as places from "..//tests/places.json";

const chromedriver = require("chromedriver");
const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

  const page = new Expedia(driver);

  describe("Expedia", ()=>{
    jest.setTimeout(40000);
    beforeEach(async () => {
      await page.navigate();
    });
    afterAll(async () => {
      await driver.quit();
    });
    places.forEach((newPlace)=>{
      test("Flights Searching", async()=>{
        
          page.flightButtonClick();
          await driver.sleep(2000);
          page.roundTripButtonClick();
          await driver.sleep(2000);
          page.flightClassClick();
          await driver.sleep(3000);
          page.leavingfromInput(newPlace.leaving);
          await driver.sleep(2000);
          page.goingtoInput(newPlace.going);
          await driver.sleep(2000);
          //page.searchButtonClick();
          
          
          //pick depart date
          page.departButtonClick();
          await driver.sleep(2000);
          page.backArrowClick();
          await driver.sleep(2000);
          page.departDateSelect();
          await driver.sleep(2000);
          page.doneButtonClick();
          await driver.sleep(2000);

          //pick return date
          page.returnButtonClick();
          await driver.sleep(2000);
          page.returnDateSelect();
          await driver.sleep(2000);
          page.doneButtonClick();
          await driver.sleep(2000);

          //search button click
          page.searchButtonClick();
          await driver.sleep(2000);
          //Take Screenshot of the results
          await page.takeScreenshot("screenShot/FlightSearchResult");
          //assertion
          let flightTickets = await page.getFlightResult();
          expect(flightTickets[0]).toContain("from salt lake city");
 

      })
    })

  })
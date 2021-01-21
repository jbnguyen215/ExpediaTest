import { By, until, WebDriver, WebElement } from "selenium-webdriver";
const fs = require("fs");

export class Expedia{
   
    driver: WebDriver;
    url: string = "https://www.expedia.com";
    pageLogo: By = By.className("large-logo");
    flightButton: By = By.css('a[href="?pwaLob=wizard-flight-pwa"]');
    roundtripButton: By = By.css('a[href="?flightType=roundtrip"]');
    class: By = By.id("preferred-class-input");
    flightClass: By = By.xpath('//span[text()="Business class"]');
    searchButton: By = By.className("uitk-layout-grid-item uitk-layout-grid-item-columnspan-small-1 uitk-layout-grid-item-columnspan-medium-2 uitk-layout-grid-item-columnspan-large-2 ");
    leavingBox: By = By.xpath('//button[@aria-label="Leaving from"]');
    leavingInput: By = By.xpath('//input[@placeholder="Where are you leaving from?"]');
    goingBox: By = By.xpath('//button[@aria-label="Going to"]');
    goingInput: By = By.xpath('//input[@placeholder="Where are you going to?"]');
    goingClick: By = By.xpath('//li[@data-index="0"]');
    departDate: By = By.id("d1-btn");
    departSelect: By = By.xpath('//button[@aria-label="Jan 25, 2021"]');
    backArrow: By = By.xpath('//button[@class="uitk-button uitk-button-small uitk-flex-item uitk-button-paging"][1]');
    returnDate: By = By.id("d2-btn");
    returnSelect: By = By.xpath('//button[@aria-label="Jan 30, 2021"]');
    doneButton: By = By.xpath('//span[text()="Done"]');
    searchResult: By = By.xpath('(//button[@class="uitk-card-link"])[1]');

    /** More Travel Drop Down Test Selectors */
    moreTravel: By = By.id("gc-custom-header-tool-bar-shop-menu");
    thingsToDo: By = By.css('a[href="/Activities"]');
    moretravelPage: By = By.className("StorefrontWizardRegion");
    cars: By = By.css('a[href="/Cars"]');
    carsPage: By = By.className("WizardCarPWA");

    /**Stay Searching Selectors */
    staysButton: By = By.css('a[href="?pwaLob=wizard-hotel-pwa-v2]');
    stayGoingBox: By = By.xpath('//button[@class="uitk-faux-input"]');
    stayGoingInput: By = By.xpath('//input[@id="location-field-destination"]');
    staySearchButton: By = By.xpath('(//button[@class="uitk-button uitk-button-large uitk-button-fullWidth uitk-button-has-text uitk-button-primary"])[1]');
    stayCheckIn: By = By.xpath('//button[@aria-label="Feb 1, 2021"]');
    stayCheckOut: By = By.xpath('//button[@aria-label="Feb 8, 2021"]');
    stayResult: By = By.xpath('//h3[@class="truncate-lines-2 all-b-padding-half pwa-theme--grey-900 uitk-type-heading-500"]');
    roomTraveler: By = By.xpath('//a[@class="uitk-link icon-right uitk-link-layout-default uitk-type-300"]');
    adultsSelect: By = By.xpath('//button[@class="uitk-button uitk-button-small uitk-flex-item uitk-step-input-button"][1]');
    travelerDoneButton: By = By.xpath('//button[text()="Done"]');


    /**Change the website language test */
    languageLink: By = By.xpath('//button[@class="uitk-button uitk-button-small uitk-button-tertiary global-navigation-nav-button"]');
    languageSelect: By = By.id("language-selector");
    languageSave: By = By.xpath('//div[@class="uitk-scrim fade-button"]');
    spanish: By = By.xpath('//option[@value="2058"]');
    regionSelect: By = By.id("site-selector");
    displaySelect: By = By.className("uitk-toolbar-title truncate");

    /**
     * 
     * @param driver 
     */
    constructor(driver: WebDriver){
        this.driver = driver;
       
    }

    /**
     * Navigate to the url passed in and click to the logo to bypass the popup
     */
    async navigate(){
            await this.driver.get(this.url);
            await this.driver.wait(until.elementLocated(this.pageLogo));
            return await (await this.driver.wait(until.elementIsVisible(await (await this.driver.findElement(this.pageLogo))))).click();
    }
    /**
     * waits for the identified element to be located
     * @param {By} elementBy - the locator for the element to getText
     */
    async getText(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy))
        return await this.driver.findElement(elementBy).getText()
    }

    /**
     * clicks the given element after waiting for it
     * @param {By} elementBy - the locator for the element to click
     */
    async click(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy));
        return (await this.driver.findElement(elementBy)).click();
    }

    /**
     * send the given element after wait for it
     * @param {By} elementBy - the locator for the element to sendKey to
     * @param keys 
     */
    async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy));
        return await this.driver.findElement(elementBy).sendKeys(keys);
    }

    /**
     * Will take a screenshot and save it to the filepath/filename provided.
     * Automatically saves as a .png file.
     * @param {string} filepath - the filepath relative to the project's base folder where you want the screenshot saved
     * @example
     * page.takeScreenshot("myFolder/mypic")
     * //picture saves in "myFolder" as "mypic.png"
     * 
     */
    async takeScreenshot(filepath: string) {
        fs.writeFile(
          `${filepath}.png`,
          await this.driver.takeScreenshot(),
          "base64",
          (e) => {
            if (e) console.log(e);
            else console.log("screenshot saved successfully");
          }
        );
      }
    

    /**Flight Search Testing - Start */
    async flightButtonClick(){
        await this.driver.wait(until.elementLocated(this.flightButton));
        return await (await this.driver.findElement(this.flightButton)).click();
    }

    async roundTripButtonClick(){
        await this.driver.wait(until.elementLocated(this.roundtripButton));
        return await (await this.driver.findElement(this.roundtripButton)).click();
    }

    async flightClassClick(){
        await this.driver.wait(until.elementLocated(this.class));
        await (await this.driver.findElement(this.class)).click();
        await this.driver.wait(until.elementLocated(this.flightClass));
        return await (await this.driver.findElement(this.flightClass)).click();
    }

    async leavingfromInput(l: string){
        await this.driver.wait(until.elementLocated(this.leavingBox));
        await this.driver.findElement(this.leavingBox).click();
        await this.driver.wait(until.elementLocated(this.leavingInput));
        return await this.driver.findElement(this.leavingInput).sendKeys(`${l}\n`);
    }

    async goingtoInput(g: string){
        await this.driver.wait(until.elementLocated(this.goingBox));
        await this.driver.findElement(this.goingBox).click();
        await this.driver.wait(until.elementLocated(this.goingInput));
        return await this.driver.findElement(this.goingInput).sendKeys(`${g}\n`);
    }

    async departButtonClick(){
        await this.driver.wait(until.elementLocated(this.departDate));
        return await (await this.driver.findElement(this.departDate)).click();  
    }
    async backArrowClick(){
        await this.driver.wait(until.elementLocated(this.backArrow));
        return await (await this.driver.findElement(this.backArrow)).click();
    }
    async departDateSelect(){
        await this.driver.wait(until.elementLocated(this.departSelect));
        return await (await this.driver.findElement(this.departSelect)).click();
    }
      
    async returnButtonClick(){
        await this.driver.wait(until.elementLocated(this.returnDate));
        return await (await this.driver.findElement(this.returnDate)).click();
    }
    async returnDateSelect(){
        await this.driver.wait(until.elementLocated(this.returnSelect));
        return await (await this.driver.findElement(this.returnSelect)).click();
    }


    async doneButtonClick(){
        await this.driver.wait(until.elementLocated(this.doneButton));
        return await (await this.driver.findElement(this.doneButton)).click();
    }


    async searchButtonClick(){
        await this.driver.wait(until.elementLocated(this.searchButton));
        return await (await this.driver.findElement(this.searchButton)).click();
    }

    async getFlightResult(){
        const searchList: Array<string> = [];
        await this.driver.wait(until.elementsLocated(this.searchResult));
        let list = await this.driver.findElements(this.searchResult);
        for (let i = 0; i < list.length; i++) {
            await searchList.push(await (await list[i].getText()).toLowerCase());
        }
        return searchList;

    }
    /**Flight Search Testing - End */
    /**---------------------------------------------------- */

    /**More Travel Drop Down Test - Start*/

    /**More Travel Drop Down Test - End*/



    /**Stay Booking - Start*/
    async staysClick(){
        await this.driver.wait(until.elementLocated(this.staysButton));
        await (await this.driver.findElement(this.staysButton)).click();
    }

    async roomTravelerClick(){
        await this.driver.wait(until.elementLocated(this.roomTraveler));
        return await (await this.driver.findElement(this.roomTraveler)).click();    
    }

    async adultSelect(){
        await this.driver.wait(until.elementLocated(this.adultsSelect));
        return await (await this.driver.findElement(this.adultsSelect)).click();
    }
    async roomTravelerDone(){
        await this.driver.wait(until.elementLocated(this.travelerDoneButton));
        return await (await this.driver.findElement(this.travelerDoneButton)).click();
    }



    async staysGoing(s: string){
        await this.driver.wait(until.elementLocated(this.stayGoingBox));
        await this.driver.findElement(this.stayGoingBox).click();
        await this.driver.wait(until.elementLocated(this.stayGoingInput));
        return await this.driver.findElement(this.stayGoingInput).sendKeys(`${s}\n`);
    }

    async stayCheckInDateClick(){
        await this.driver.wait(until.elementLocated(this.stayCheckIn));
        return await (await this.driver.findElement(this.stayCheckIn)).click();
    }

    async stayCheckoutDateClick(){
        await this.driver.wait(until.elementLocated(this.stayCheckOut));
        return await (await this.driver.findElement(this.stayCheckOut)).click();
    }

    async staySearchButtonClick(){
        await this.driver.wait(until.elementLocated(this.staySearchButton));
        return await (await this.driver.findElement(this.staySearchButton)).click();
    }

    async getStayResult(){
        const staySearchList: Array<string> = [];
        await this.driver.wait(until.elementsLocated(this.stayResult));
        let list = await this.driver.findElements(this.stayResult);
        for (let i = 0; i < list.length; i++) {
            await staySearchList.push(await (await list[i].getText()).toLowerCase());
        }
        return staySearchList;

    }
    /**Stay Booking  - End*/


    /**Change the website language - start*/

    async languageClick(){
        await this.driver.wait(until.elementLocated(this.languageLink));
        return await (await this.driver.findElement(this.languageLink)).click();
    }

    async languageDropBox(){
        await this.driver.wait(until.elementLocated(this.languageSelect))
        return await (await this.driver.findElement(this.languageSelect)).click();
    }

    async spanishSelect(){
        return await (await this.driver.wait(until.elementIsVisible(await (await this.driver.findElement(this.spanish))))).click();
    }

    async displayClick(){
        await this.driver.wait(until.elementLocated(this.displaySelect))
        return await (await this.driver.findElement(this.displaySelect)).click();
    }

    async lanSaveButtonClick(){
        await this.driver.wait(until.elementLocated(this.languageSave));
        return await (await this.driver.findElement(this.languageSave)).click();
    }
    /**Change the website language - ends */

}
import { By, until, WebDriver, WebElement } from "selenium-webdriver";

export class Expedia{
    driver: WebDriver;
    url: string = "https://www.expedia.com";
    pageLogo: By = By.className("large-logo");
    flightSearch: By = By.className("uitk-faux-input");
    flightButton: By = By.css('a[href="?pwaLob=wizard-flight-pwa"]');
    roundtripButton: By = By.css('a[href="?flightType=roundtrip"]');
    searchButton: By = By.className("uitk-button uitk-button-large uitk-button-fullWidth uitk-button-has-text uitk-button-primary");
    leavingBox: By = By.xpath('//span[text()="Leaving from"]');
    goingBox: By = By.xpath('//span[text()="Going to"]');
    departDate: By = By.id("d1-btn");
    returnDate: By = By.id("d2-btn");
    leavingInput: By = By.className("uitk-flex-item uitk-typeahead-toolbar-field toolbar-content-v1")
    goingInput: By = By.className("uitk-flex uitk-flex-align-items-center uitk-toolbar uitk-typeahead-toolbar uitk-typeahead-toolbar-v1")



    constructor(driver: WebDriver){
        this.driver = driver;
    }

    async navigate(){
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.pageLogo));
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.pageLogo)));
    }

    async getText(elementBy: By): Promise<string> {
        let element = await this.getElement(elementBy);
        await this.driver.wait(until.elementIsEnabled(element));
        return element.getText();
      }

    async click(elementBy: By): Promise<void> {
        let element = await this.getElement(elementBy);
        await this.driver.wait(until.elementIsEnabled(element));
        return await element.click();
      }

    // async sendKeys(elementBy: By, keys) {
    //     await this.driver.wait(until.elementLocated(elementBy));
    //     return await this.driver.findElement(elementBy).sendKeys(keys);
    // }

    async setInput(elementBy: By, keys: any): Promise<void> {
        let input = await this.getElement(elementBy);
        await this.driver.wait(until.elementIsEnabled(input));
        await input.clear();
        return input.sendKeys(keys);
    }

      async getElement(elementBy: By): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(elementBy));
        let element = await this.driver.findElement(elementBy);
        await this.driver.wait(until.elementIsVisible(element));
        return element;
      }

    async roundTripFlight(): Promise<void>{
        await this.driver.wait(until.elementLocated(this.flightButton));
        await this.click(this.flightButton);
        await this.driver.wait(until.elementLocated(this.roundtripButton));
        await this.click(this.roundtripButton);
    }

    //   async leavingSearch(searchText: string) {
    //     await this.setInput(this.leavingInput, searchText);
    //   }

    async inputLeaving(leavingInput: string): Promise<void> {
        let input = await this.getElement(this.leavingInput);
        await this.driver.wait(until.elementIsEnabled(input));
        //await input.clear();
        return input.sendKeys(leavingInput);
    }

    // async goingSearch(searchText: string) {
    //     await this.setInput(this.goingInput, searchText);
    // }  

    async inputGoing(goingInput: string): Promise<void> {
        let input = await this.getElement(this.goingInput);
        await this.driver.wait(until.elementIsEnabled(input));
        //await input.clear();
        return input.sendKeys(goingInput);
    }

    async clickLeavingSearch(): Promise<void>{
        await this.driver.wait(until.elementLocated(this.leavingBox));
        await this.click(this.leavingBox);
    }

    async clickGoingSearch(): Promise<void>{
        await this.driver.wait(until.elementLocated(this.goingBox));
        await this.click(this.goingBox);
    }

}
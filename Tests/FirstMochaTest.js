require("chromedriver")
var webdriver = require('selenium-webdriver')
const {By } = require('selenium-webdriver')
var driver;
var addContext = require("mochawesome/addContext")


describe('Test Suite', function () {

    afterEach(function(){
        if(this.currentTest.state == 'failed'){
            let imageFileName = this.currentTest.title + '.jpeg';
            driver.takeScreenshot().then(
                function(image){
                    require('fs').writeFileSync('./screenshots/' + imageFileName, image, 'base64')
                }
            )
            addContext(this,'Following comes the failed test image')
            addContext(this, '../screenshots/' + imageFileName)
        }
    })

    afterEach(async()=>{
        await driver.quit();
    })


    it("Selenium check cookies dialog", async()=>{
        driver = new webdriver.Builder().forBrowser("chrome").build();
        await driver.get("http://www.google.com")
        this.AcceptButton = By.xpath("//*[text()='Zgadzam się']")
        await driver.wait(webdriver.until.elementLocated(this.AcceptButton), 5000)
    })
})
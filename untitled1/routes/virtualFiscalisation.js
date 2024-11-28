const express = require("express");
const router = express.Router();

const { Builder, By, until, Select } = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

router.post("/register-company", async function (req, res) {
  const {
    taxPayerName,
    tradeName,
    companyTin,
    companyVat,
    companyPhoneNumber,
    companyEmail,
    houseNo,
    streetName,
    city,
    province,
    region,
    station,
    deviceModel,
    supplierId,
    serialNumber,
  } = req.body;

  console.log(req.body);
  console.log("we are in part 1");
  try {
    let options = new chrome.Options();
    options.addArguments("--headless");
    options.addArguments("--no-sandbox");
    options.addArguments("--disable-dev-shm-usage");
    options.addArguments("--disable-gpu"); // Optional for headless mode
    options.addArguments("--window-size=1920x1080"); // Set a default window size
    options.addArguments("--remote-debugging-port=9222"); // Enable remote debugging
    options.addArguments("--disable-software-rasterizer"); // Prevents rasterization issues
    options.addArguments("--disable-extensions"); // Disable extensions
    let driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    //let driver = await new Builder().forBrowser("chrome").build();

    console.log("we are in part 2");
    try {
      await driver.get("http://fdmsops.zimra.co.zw/fdms-public/add-device");
      console.log("part 3");
      const submitForm = await driver.wait(
        until.elementLocated(By.css('form[id="submitNewDevice-form"]')),
        20000
      );

      const tinField = await submitForm.findElement(By.id("tin"));
      const vatField = await submitForm.findElement(By.id("vat_number"));
      const tradeNameField = await submitForm.findElement(By.id("trade_name"));
      const taxpayerNameField = await submitForm.findElement(By.id("taxpayer"));
      const companyEmailField = await submitForm.findElement(
        By.id("taxpayer_email")
      );
      const branchEmailField = await submitForm.findElement(
        By.id("branch_email")
      );
      const companyPhoneNumberField = await submitForm.findElement(
        By.id("phone_number")
      );
      const houseNoField = await submitForm.findElement(By.id("house_number"));
      const streetNameField = await submitForm.findElement(By.id("street"));
      const cityField = await submitForm.findElement(By.id("city"));
      const provinceField = await submitForm.findElement(By.id("province"));
      const serialNumberField = await submitForm.findElement(
        By.id("serial_number")
      );
      const regionField = await submitForm.findElement(By.id("region"));
      const deviceModelField = await submitForm.findElement(
        By.id("model_name")
      );

      await tinField.sendKeys(companyTin);
      await vatField.sendKeys(companyVat);
      await tradeNameField.sendKeys(tradeName);
      await taxpayerNameField.sendKeys(taxPayerName);
      await companyEmailField.sendKeys(companyEmail);
      await branchEmailField.sendKeys(companyEmail);
      await companyPhoneNumberField.sendKeys(companyPhoneNumber);
      await houseNoField.sendKeys(houseNo);
      await streetNameField.sendKeys(streetName);
      await cityField.sendKeys(city);
      await provinceField.sendKeys(province);
      await serialNumberField.sendKeys(serialNumber);
      await regionField.sendKeys(region);
      await deviceModelField.sendKeys(deviceModel);

      // Wait for the station dropdown to update
      const stationField = await submitForm.findElement(By.id("station"));
      await driver.wait(until.elementLocated(By.id("station")), 10000);
      await driver.wait(until.elementIsVisible(stationField), 10000);
      await stationField.sendKeys(station);

      const supplierField = await submitForm.findElement(By.id("supplier"));
      await driver.wait(until.elementLocated(By.id("supplier")), 20000);
      await driver.wait(until.elementIsVisible(supplierField), 20000);

      const selectSupplier = new Select(supplierField);
      await selectSupplier.selectByValue(supplierId);

      const registerCompanyButton = await driver.wait(
        until.elementLocated(By.css("button.btn.btn-success")),
        40000
      );

      await registerCompanyButton.click();
      // Wait for the page to reload after form submission
      await driver.wait(
        until.urlIs("http://fdmsops.zimra.co.zw/fdms-public/add-device"),
        20000
      ); // Adjust the URL as necessary

      // Wait for the table to appear and be visible
      const tableSelector =
        "table.table.table-bordered.table-sm.table-responsive"; // Make sure this selector is correct
      await driver.wait(until.elementLocated(By.css(tableSelector)), 20000); // Wait for the table to be located
      const tableElement = await driver.wait(
        until.elementIsVisible(await driver.findElement(By.css(tableSelector))),
        20000
      ); // Wait until table is visible

      // Retrieve the last two columns from the table
      const rows = await tableElement.findElements(By.css("tbody tr"));
      console.log(`Number of rows found: ${rows.length}`);
      const lastRow = rows[rows.length - 1]; // Get the last row (adjust if needed)
      const columns = await lastRow.findElements(By.css("td"));
      const lastTwoColumns = columns.slice(-2); // Get the last two columns

      // Extract text from the last two columns
      const values = await Promise.all(
        lastTwoColumns.map(async (column) => {
          return await column.getText();
        })
      );

      console.log("Last two column values:", values);
      res.status(201).json({
        success: true,
        message: `Your message has been sent to Zimra `,
         values,
      });
    } catch (error) {
      console.error(error);
    } finally {
      await driver.quit(); // Ensure the driver session is closed after processing
    }


  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;

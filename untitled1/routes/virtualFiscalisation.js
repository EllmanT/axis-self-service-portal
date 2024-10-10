const express = require("express");
const router = express.Router();
const sendMail = require("../utils/sendMail");

const { Builder, By, until, Select } = require("selenium-webdriver");

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
  } = req.body;
  console.log(req.body);
  try {
    const serialNumber = "35435sd43534dfvcc";
    const supplierId = "2000152399";

    console.log(supplierId);
    // Initialize the WebDriver
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      // Step 3: Navigate to the other site
      await driver.get("http://fdmsops.zimra.co.zw/fdms-public/add-device");

      // Wait for the "device id" field to be present
      // Wait for the form to be present
      const submitForm = await driver.wait(
        until.elementLocated(By.css('form[id="submitNewDevice-form"]')),
        20000
      );

      // Find the "deviceId" input within the form
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
      // const stationField = await submitForm.findElement(By.id('station'));
      // const deviceIdField = await submitForm.findElement(By.id(''));
      // const supplierField = await submitForm.findElement(By.id('supplier'));
      const deviceModelField = await submitForm.findElement(
        By.id("model_name")
      );

      // Input the device ID
      // const deviceId = 'YourDeviceID'; // Replace with the actual device ID value
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
      // await stationField.sendKeys(station);
      await deviceModelField.sendKeys(deviceModel);
      // await supplierField.sendKeys(supplierId);

      // Wait for the station dropdown to update
      const stationField = await submitForm.findElement(By.id("station"));
      await driver.wait(until.elementLocated(By.id("station")), 10000); // Wait for the station dropdown
      // Optionally, wait until specific options are available, if necessary
      await driver.wait(until.elementIsVisible(stationField), 10000);
      // Now select the station
      await stationField.sendKeys(station);

      // Wait for the supplier dropdown to be located
const supplierField = await submitForm.findElement(By.id("supplier"));
await driver.wait(until.elementLocated(By.id("supplier")), 20000); // Wait for the supplier dropdown

// Wait until the supplier dropdown is visible
await driver.wait(until.elementIsVisible(supplierField), 20000);

// Create a Select object for the supplier dropdown
const selectSupplier = new Select(supplierField);

// Select the supplier by value
await selectSupplier.selectByValue(supplierId); // Use the value you want to select

      const registerCompanyButton = await driver.wait(
        until.elementLocated(By.css("button.btn.btn-success")),
        40000
      );

      // Trigger the button click
      await registerCompanyButton.click();
      //  await driver.findElement(By.name('otherField2')).sendKeys(submittedValue2);
      //  await driver.findElement(By.name('submit')).click(); // Submit the second form
    } catch (error) {
      console.error(error);
    }

    res.status(201).json({
      success: true,
      message: `Your message has been sent to Zimra `,
    });
  } catch (error) {
    console.log(error.message);
  }
});
module.exports = router;

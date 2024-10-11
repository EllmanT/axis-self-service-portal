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
    supplierId,
  } = req.body;
  try {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      await driver.get("http://fdmsops.zimra.co.zw/fdms-public/add-device");

      const submitForm = await driver.wait(until.elementLocated(By.css('form[id="submitNewDevice-form"]')),20000);

      const tinField = await submitForm.findElement(By.id("tin"));
      const vatField = await submitForm.findElement(By.id("vat_number"));
      const tradeNameField = await submitForm.findElement(By.id("trade_name"));
      const taxpayerNameField = await submitForm.findElement(By.id("taxpayer"));
      const companyEmailField = await submitForm.findElement(By.id("taxpayer_email"));
      const branchEmailField = await submitForm.findElement(By.id("branch_email"));
      const companyPhoneNumberField = await submitForm.findElement(By.id("phone_number"));
      const houseNoField = await submitForm.findElement(By.id("house_number"));
      const streetNameField = await submitForm.findElement(By.id("street"));
      const cityField = await submitForm.findElement(By.id("city"));
      const provinceField = await submitForm.findElement(By.id("province"));
      const serialNumberField = await submitForm.findElement(By.id("serial_number"));
      const regionField = await submitForm.findElement(By.id("region"));
      const deviceModelField = await submitForm.findElement(By.id("model_name"));

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

      // Trigger the button click
      await registerCompanyButton.click();
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

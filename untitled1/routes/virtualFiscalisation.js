
const express = require("express");
const router = express.Router();
const sendMail = require("../utils/sendMail");

const { Builder, By, until } = require('selenium-webdriver');

router.post('/register-company', async function(req, res){
    const { taxPayerName, tradeName, companyTin, companyVat, companyPhoneNumber,companyEmail,houseNo,streetName, city, province,region,station,deviceModel}=req.body
    console.log(req.body)
    try {
      const serialNumber="35435sd43534dfv"

     // Initialize the WebDriver
     let driver = await new Builder().forBrowser('chrome').build();

     try {
        
         // Step 3: Navigate to the other site
         await driver.get('http://fdmsops.zimra.co.zw/fdms-public/add-device');
 
         // Wait for the "device id" field to be present
      // Wait for the form to be present
      const submitForm = await driver.wait(until.elementLocated(By.css('form[id="submitNewDevice-form"]')), 20000);

      // Find the "deviceId" input within the form
      const tinField = await submitForm.findElement(By.id('tin'));
      const vatField = await submitForm.findElement(By.id('vat_number'));
      const tradeNameField = await submitForm.findElement(By.id('trade_name'));
      const taxpayerNameField = await submitForm.findElement(By.id('taxpayer'));
      const companyEmailField = await submitForm.findElement(By.id('taxpayer_email'));
      const branchEmailField = await submitForm.findElement(By.id('branch_email'));
      const companyPhoneNumberField = await submitForm.findElement(By.id('phone_number'));
      const houseNoField = await submitForm.findElement(By.id('house_number'));
      const streetNameField = await submitForm.findElement(By.id('street'));
      const cityField = await submitForm.findElement(By.id('city'));
      const provinceField = await submitForm.findElement(By.id('province'));
      const serialNumberField = await submitForm.findElement(By.id('serial_number'));
      const regionField = await submitForm.findElement(By.id('region'));
      const stationField = await submitForm.findElement(By.id('station'));
      // const deviceIdField = await submitForm.findElement(By.id(''));
      const supplierField = await submitForm.findElement(By.id('supplier'));
      const deviceModelField = await submitForm.findElement(By.id('model_name'));

      const supplierId=2000152399

      console.log(supplierField)
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
      await stationField.sendKeys(station);
      await deviceModelField.sendKeys(deviceModel);
      await supplierField.sendKeys(supplierId);

      const registerCompanyButton = await driver.wait(until.elementLocated(By.css('button.btn.btn-success')), 20000);

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
  
})
module.exports = router; 

const express = require("express");
const router = express.Router();
const sendMail = require("../utils/sendMail");

const { Builder, By, until } = require('selenium-webdriver');

router.post('/register-company', async function(req, res){
    const {deviceId, companyName, email}=req.body
    console.log(req.body)
    try {
        await sendMail({
          
          subject: `Close day request for ${companyName} Production, Device id ${deviceId}`,
          companyName: companyName,
          deviceId: deviceId,
        });


     // Initialize the WebDriver
     let driver = await new Builder().forBrowser('chrome').build();

     try {
        
         // Step 3: Navigate to the other site
         await driver.get('http://fdmsops.zimra.co.zw/fdms-public/close-fiscal-day');
 
         // Wait for the "device id" field to be present
      // Wait for the form to be present
      const submitForm = await driver.wait(until.elementLocated(By.css('form[id="submitCloseDay-form"]')), 10000);

      // Find the "deviceId" input within the form
      const deviceIdField = await submitForm.findElement(By.id('deviceID'));
      const companyField = await submitForm.findElement(By.id('fiscalDay'));

      // Input the device ID
      // const deviceId = 'YourDeviceID'; // Replace with the actual device ID value
      await deviceIdField.sendKeys(deviceId);
      await companyField.sendKeys(companyName);

      const closeDayButton = await driver.wait(until.elementLocated(By.css('button.btn.btn-success')), 10000);

      // Trigger the button click
      await closeDayButton.click();
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
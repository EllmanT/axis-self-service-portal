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

  
// const  taxPayerName= 'Test'
//   const tradeName= 'test'
//  const companyTin= 2000111222
//   const companyVat= 220111222
//   const companyPhoneNumber= '0771234567'
//   const companyEmail= 'tmhere@gmail.com'
//   const houseNo= '2'
//   const streetName= 'test'
//   const city='Harare'
//   const province='Harare'
//   const region= 'Region 1 Small Clients Office'
//   const station= 'SCO Kurima'
//   const serialNumber= 'test3243232441'
//  const deviceModel= 'Self'
//   const supplierId= '2000093077';

  console.log("in part one ");

  // Validate required fields before starting selenium
  const missingFields = [];
  if (!taxPayerName) missingFields.push("taxPayerName");
  if (!tradeName) missingFields.push("tradeName");
  if (!companyTin) missingFields.push("companyTin");
  if (!companyPhoneNumber) missingFields.push("companyPhoneNumber");
  if (!companyEmail) missingFields.push("companyEmail");
  if (!houseNo) missingFields.push("houseNo");
  if (!streetName) missingFields.push("streetName");
  if (!city) missingFields.push("city");
  if (!province) missingFields.push("province");
  if (!region) missingFields.push("region");
  if (!station) missingFields.push("station");
  if (!deviceModel) missingFields.push("deviceModel");
  if (!supplierId) missingFields.push("supplierId");
  if (!serialNumber) missingFields.push("serialNumber");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      stage: "payload_validation",
      message: "Missing required fields in request body",
      missingFields,
    });
  }

  let stage = "browser_initialization";
  let driver;

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
    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options)
      .build();
    //let driver = await new Builder().forBrowser("chrome").build();

    console.log("we are in part 2");
    try {
      stage = "page_navigation";
      await driver.get("http://fdmsops.zimra.co.zw/fdms-public/add-device");
      console.log("part 3");

      stage = "form_location";
      const submitForm = await driver.wait(
        until.elementLocated(By.css('form[id="submitNewDevice-form"]')),
        20000
      );

      stage = "field_location";
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

      stage = "filling_tin";
      await tinField.sendKeys(companyTin);

      stage = "filling_vat";
      if(companyVat !=="" && companyVat !== null && companyVat !== undefined){ 
      await vatField.sendKeys(companyVat);
      }

      stage = "filling_trade_name";
      await tradeNameField.sendKeys(tradeName);

      stage = "filling_taxpayer_name";
      await taxpayerNameField.sendKeys(taxPayerName);

      stage = "filling_company_email";
      await companyEmailField.sendKeys(companyEmail);

      stage = "filling_branch_email";
      await branchEmailField.sendKeys(companyEmail);

      stage = "filling_phone_number";
      await companyPhoneNumberField.sendKeys(companyPhoneNumber);

      stage = "filling_house_number";
      await houseNoField.sendKeys(houseNo);

      stage = "filling_street_name";
      await streetNameField.sendKeys(streetName);

      stage = "filling_city";
      await cityField.sendKeys(city);

      stage = "filling_province";
      await provinceField.sendKeys(province);

      stage = "filling_serial_number";
      await serialNumberField.sendKeys(serialNumber);

      stage = "filling_region";
      await regionField.sendKeys(region);

      stage = "filling_device_model";
      await deviceModelField.sendKeys(deviceModel);

      // Wait for the station dropdown to update
      stage = "locating_station_field";
      const stationField = await submitForm.findElement(By.id("station"));
      await driver.wait(until.elementLocated(By.id("station")), 10000);
      await driver.wait(until.elementIsVisible(stationField), 10000);

      stage = "filling_station";
      await stationField.sendKeys(station);

      stage = "locating_supplier_field";
      const supplierField = await submitForm.findElement(By.id("supplier"));
      await driver.wait(until.elementLocated(By.id("supplier")), 20000);
      await driver.wait(until.elementIsVisible(supplierField), 20000);

      stage = "selecting_supplier";
      const selectSupplier = new Select(supplierField);
      await selectSupplier.selectByValue(supplierId);

      stage = "locating_submit_button";
      const registerCompanyButton = await driver.wait(
        until.elementLocated(By.css("button.btn.btn-success")),
        40000
      );

      stage = "submitting_form";
      await registerCompanyButton.click();
      console.log("device has been registered ");

      // Wait for the page to reload after form submission
      // await driver.wait(
      //   until.urlIs("http://fdmsops.zimra.co.zw/fdms-public/add-device"),
      //   20000
      // ); // Adjust the URL as necessary
      console.log("form reload done and found ");

      // Wait for the table to appear and be visible
      const tableSelector =
        "table.table.table-bordered.table-sm.table-responsive"; // Make sure this selector is correct

      stage = "waiting_for_result_table";
      await driver.wait(until.elementLocated(By.css(tableSelector)), 20000); // Wait for the table to be located
      console.log("form reload done and found ");

      const tableElement = await driver.wait(
        until.elementIsVisible(await driver.findElement(By.css(tableSelector))),
        20000
      ); // Wait until table is visible
      console.log("table element has been located ");

      stage = "parsing_result_table";
      // Retrieve the last two columns from the table
      const rows = await tableElement.findElements(By.css("tbody tr"));
      console.log(`Number of rows found: ${rows.length}`);

      if (rows.length === 0) {
        throw new Error("Result table was found but contained no rows. The registration may not have completed successfully.");
      }

      const lastRow = rows[rows.length - 1]; // Get the last row (adjust if needed)
      const columns = await lastRow.findElements(By.css("td"));
      const lastTwoColumns = columns.slice(-2); // Get the last two columns

      if (lastTwoColumns.length < 2) {
        throw new Error(`Expected at least 2 columns in result table but found ${columns.length}. The page structure may have changed.`);
      }

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
      console.error(`[virtualFiscalisation] Error at stage "${stage}":`, error);

      // Attempt to capture a page source snapshot for deeper debugging
      let pageSource = null;
      let currentUrl = null;
      try {
        currentUrl = await driver.getCurrentUrl();
        pageSource = await driver.getPageSource();
      } catch (_) {
        // driver may already be in a bad state; ignore secondary errors
      }

      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          stage,
          message: `Registration failed during stage: "${stage}". ${error.message}`,
          error: {
            name: error.name,
            message: error.message,
            stack: error.stack,
          },
          context: {
            currentUrl,
            pageSourceLength: pageSource ? pageSource.length : null,
            // Include a short snippet of page source to help identify page state
            pageSourceSnippet: pageSource ? pageSource.substring(0, 2000) : null,
          },
          submittedPayload: {
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
          },
        });
      }
    } finally {
      if (driver) {
        await driver.quit(); // Ensure the driver session is closed after processing
      }
    }
  } catch (error) {
    console.error("[virtualFiscalisation] Browser initialization error:", error);
    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        stage,
        message: `Failed to initialise the Chrome browser. ${error.message}`,
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
        },
      });
    }
  }
});
module.exports = router;

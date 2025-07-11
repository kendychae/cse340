const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")
const validate = require("../utilities/validate")

// Route to build inventory management view (requires Employee/Admin)
router.get("/", utilities.checkJWTToken, utilities.checkAccountType, utilities.handleErrors(invController.buildManagement))

// Route to build add classification view (requires Employee/Admin)
router.get("/add-classification", utilities.checkJWTToken, utilities.checkAccountType, utilities.handleErrors(invController.buildAddClassification))

// Route to process add classification (requires Employee/Admin)
router.post(
  "/add-classification",
  utilities.checkJWTToken,
  utilities.checkAccountType,
  validate.classificationRules(),
  validate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Route to build add inventory view (requires Employee/Admin)
router.get("/add-inventory", utilities.checkJWTToken, utilities.checkAccountType, utilities.handleErrors(invController.buildAddInventory))

// Route to process add inventory (requires Employee/Admin)
router.post(
  "/add-inventory",
  utilities.checkJWTToken,
  utilities.checkAccountType,
  validate.inventoryRules(),
  validate.checkInventoryData,
  utilities.handleErrors(invController.addInventory)
)

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId))

// Route to build inventory item detail view
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId))

module.exports = router

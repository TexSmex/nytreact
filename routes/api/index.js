const router = require("express").Router();
const bookRoutes = require("./books");

// Book routes
router.use("/articles",bookRoutes);

module.exports = router;

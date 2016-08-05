const express = require('express');
const router  = express.Router();

router.get("/new", (req, res)) => {
  res.console.log("Working!");
}

return router;
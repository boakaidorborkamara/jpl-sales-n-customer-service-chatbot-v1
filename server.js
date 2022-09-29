const express = require('express');
require('dotenv').config();


const PORT = process.env.PORT || 3000;
console.log(process.env);

// Add support for GET requests to our webhook
app.get("/messaging-webhook", (req, res) => {
  
    // Parse the query params
      let mode = req.query["hub.mode"];
      let token = req.query["hub.verify_token"];
      let challenge = req.query["hub.challenge"];
    
      // Check if a token and mode is in the query string of the request
      if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === config.verifyToken) {
          // Respond with the challenge token from the request
          console.log("WEBHOOK_VERIFIED");
          res.status(200).send(challenge);
        } else {
          // Respond with '403 Forbidden' if verify tokens do not match
          res.sendStatus(403);
        }
      }
});

const app = express();
app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})
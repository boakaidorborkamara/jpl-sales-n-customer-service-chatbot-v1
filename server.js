const express = require('express');
require('dotenv').config();


const PORT = process.env.PORT || 3000;
// console.log(process.env);

const app = express();

//home route
app.get('/', (req, res)=>{
    res.send("working")
})


// an endpoint on that receives and processes Webhooks notifications, JSON objects
app.post("/webhook", (req, res) => {

    // get the request body 
    let body = req.body;
  
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });
    
  
  // Send a 200 OK response if this is a page webhook
  if (body.object === "page") {
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");

    // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
}); 



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



app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})
require("dotenv").config();
const express = require('express');
const request = require('request');


//handle setting up of persistent menu and GET STARTED btn
let setupProfile = async ()=>{

    console.log("setup profile code running");
    // facebook graph url 
    let url = `https://graph.facebook.com/v15.0/me/messenger_profile?access_token=${process.env.PAGE_ACCESS_TOKEN}`;

    // request body to be sent to facebook server url 
    let request_body={
        "get_started": {
            "payload": "GET_STARTED"
        },
        "persistent_menu": [
            {
                "locale": "default",
                "composer_input_disabled": false,
                "call_to_actions": [
                    {
                        "type": "postback",
                        "title": "Shop",
                        "payload": "SHOP"
                    },
                    {
                        "type": "postback",
                        "title": "Talk to a Customer Service Agent",
                        "payload": "CUSTOMER_SERVICE_AGENT"
                    },
                    {
                        "type": "postback",
                        "title": "FAQs",
                        "payload": "FAQs"
                    },
                    
                    {
                        "type": "postback",
                        "title": "Restart this conversation",
                        "payload": "RESTART_CONVERSATION"
                    },
                    {
                        "type": "nested",
                        "title": "More info",
                        "call_to_actions": [
                            {
                                "type": "web_url",
                                "title": "View Facebook Fan Page",
                                "url": "https://www.facebook.com/haryphamdev",
                                "webview_height_ratio": "full"
                            },
                            {
                                "type": "web_url",
                                "title": "View Youtube channel",
                                "url": "https://bit.ly/subscribe-haryphamdev",
                                "webview_height_ratio": "full"
                            },
                        ]
                    }
                ]
            }
        ]
    }

    try{
        //execute request
        const options = {
            url:url,
            method:"POST",
            contentType: 'application/json',
            json: request_body
        }

        request(options,(err,res,body)=>{
            if (!err) {
                console.log('Menu setup!');
            } else {
                console.error("Unable to setup menu:" + err);
            }
        })
    }
    catch(err){
        console.log(err);
    }
   
}


//responsible to get the username of each person interacting with our bot
let getFacebookUsername = async (sender_psid)=>{
    try{
        let url = `https://graph.facebook.com/${sender_psid}?    fields=first_name,last_name,profile_pic&access_token=${process.env.PAGE_ACCESS_TOKEN}`;

     let full_name;

      //execute request
      const options = {
          url:url,
          method:"GET",
      }

       request(options,(err,res,body)=>{``
          if (!err) {
              console.log('Got profile!');
              let user_profile_info = JSON.parse(body);
              full_name = `${user_profile_info.first_name} ${user_profile_info.last_name}`;

              console.log(user_profile_info);
              console.log(full_name);
              console.log("RETURNING DATA");
               return 'sample name';
              console.log("DONE RETURNING");
          } else {
              console.error("Unable to get profile:" + err);
          }
      })

    // console.log(full_name);
      return full_name;
    }catch(err){
     console.log(err);
    }
  }




module.exports = {
    setupProfile:setupProfile,
    getFacebookUsername: getFacebookUsername
}


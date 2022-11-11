require("dotenv").config();
const express = require('express');
const request = require('request');
const profileService = require('./profileService');
const conversationNotifier = require('./conversationNotifier');

const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

//enable the chatbot to welcome users
let sendWelcomeMessages = async function(sender_psid){

    //get the person user name
    let username = await profileService.getFacebookUsername(sender_psid);
    console.log("Username:", username);

    //send text message
    let response1 = {
        "text": `Hi ${username}! Welcome to J-Palm Liberia, the home of Kernel Fresh products.`
    };

    let response2 = {
        "text": "At any time, use the menu below to navigate through the features."
    };

    //send a quick reply
    let response3 = {
        "text": "What can I do to help you today?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Categories",
                "payload": "CATEGORIES",
            },
            {
                "content_type": "text",
                "title": "Lookup Order",
                "payload": "LOOKUP_ORDER",
            },
            {
                "content_type": "text",
                "title": "Talk to an agent",
                "payload": "TALK_AGENT",
            },
        ]
    };

    await profileService.setupProfile(); 
    
    await sendMessage(sender_psid, response1);
    await sendMessage(sender_psid, response2);
    await sendMessage(sender_psid, response3);

    
    

}

//responsible to send message
let sendMessage = async function (sender_psid, response){

    
    // Send the HTTP request to the Messenger Platform
    let url = "https://graph.facebook.com/v6.0/me/messages";


    // data to be sent to facebook server using the fb graph api
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };


    try{

        //notify the person that their message has been read
        await conversationNotifier.markMessageRead(sender_psid);
        //notify the person that the bot is typing
        await conversationNotifier.sendTypingOn(sender_psid);

        const options = {
            "uri": "https://graph.facebook.com/v15.0/me/messages",
            "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
            "method": "POST",
            "json": request_body
        }

        request(options,(err,res,body)=>{
            if (!err) {
                console.log('message sent!');
              } else {
                console.error("Unable to send message:" + err);
              }
        })

    }
    catch(err){
        console.log(err);
    }
}


module.exports ={
    sendMessage:sendMessage,
    sendWelcomeMessages:sendWelcomeMessages
}
const express = require('express');
require('dotenv').config();

//handle setting up of persistent menu and GET STARTED btn
let handleProfileAPI = async ()=>{

    // facebook graph url 
    let url = "`https://graph.facebook.com/v7.0/me/messenger_profile?access_token=${PAGE_ACCESS_TOKEN}";

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
                        "title": "Talk to an agent",
                        "payload": "TALK_AGENT"
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

    //execute request
    const response = await fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(request_body)
    });

    const content = await response.json();
    return content;
   
}


//responsible to get the username of each person interacting with our bot
let getFacebookUsername = async (sender_psid)=>{
    let url = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;

    await fetch(url)
    .then((response)=>response.json)
    .then((data)=>{
        let username = data;
    })
    .catch((err)=>{
        if(err){
            console.log(err);
        }
    })
        
}


//notify user when the bot is typing
let sendTypingOn = async (sender_psid)=>{

    let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`;

    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    };

    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(request_body)
    });

    // let content = await response;
}
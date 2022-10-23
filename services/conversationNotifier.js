require("dotenv").config();
const request  = require("request");

//notify user when the bot is typing
const sendTypingOn = async function (sender_psid){


     // data to be sent to facebook server using the fb graph api
     let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    };

    //facebook graph api
    let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`;


    let options = {
        url:url,
        headers:{
            'Content-Type':"application/json"
        },
        method:'POST',
        json:request_body
    }

    try{
        //make http request
        request(options,(err,res,body)=>{
            if(err){
                console.log(err);
            }
        })
    }
    catch(err){
        console.log(err);
    }

   

}

//notify user when message is being read
let markMessageRead = async (sender_psid)=>{

    //facebook graph api
    let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`;

    // data to be sent to facebook server using the fb graph api
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    };

    try{

        let options = {
            url:url,
            headers:{
                'Content-Type':"application/json"
            },
            method:'POST',
            json:request_body
        }

        //make http request
        request(options,(err,res,body)=>{
            if(err){
                console.log(err);
            }
        })
    }
    catch(err){
        console.log(err);
    }

}


module.exports = {
    sendTypingOn:sendTypingOn,
    markMessageRead:markMessageRead
}
require("dotenv").config();

//notify user when the bot is typing
const sendTypingOn = async function (sender_psid){

    let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`;

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

    let content = await response.json();

    return content;
}

//notify user when message is being read
let markMessageRead = async (sender_psid)=>{
    let url = `https://graph.facebook.com/v6.0/me/messages?access_token=${process.env.PAGE_ACCESS_TOKEN}`;

    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    };

    const response = await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':"application/json"
        },
        body:JSON.stringify(request_body)
    });
}


module.exports = {
    sendTypingOn:sendTypingOn,
    markMessageRead:markMessageRead
}
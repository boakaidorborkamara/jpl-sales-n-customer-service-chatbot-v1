const express = require('express');
require('dotenv').config();


const PORT = process.env.PORT || 3000;
console.log(process.env);

const app = express();
app.listen(PORT,()=>{
    console.log(`Server is listening on ${PORT}`);
})
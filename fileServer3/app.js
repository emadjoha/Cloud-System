const express = require("express");
const app = express();

app.use(express.static('public'));
app.use(express.static('upload'));

app.use('/api',require('./routes/api'));

const PORT = process.env.PORT || 8082;
app.listen(PORT, () => { console.log(`server runnung on port ${PORT} ...`) });
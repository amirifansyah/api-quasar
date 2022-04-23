const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const dbconfig = require('./config/DbConfig');
const cors = require('cors');
const { json } = require('express/lib/response');
const urlencoded = require('body-parser/lib/types/urlencoded');

mongoose.connect(dbconfig.mongoURL, {
    useNewUrlParser: true,
}).then(() => console.log('Connected to database')).catch(err => console.log(err));

app.use(cors())

app.use(bodyParser.json({
    extends: true,
    limit: '50mb',
}))

app.use(bodyParser.urlencoded({
    extends: true,
    limit: '50mb',
}))


app.use('/api/user', require('./routes/User'));

app.listen(port, function (){
    console.log('Server is running on port: ' + port);
});
// app.listen(port, () => console.log(`Server is running on port ${port}`));

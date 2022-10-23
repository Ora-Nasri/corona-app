const express = require('express');
const  mongoose  = require('mongoose');
const memberRouter = require("./backend/routes/memberRouter");
const cors = require('cors');
const app = express();
// const path = require('path');
// const exphbs = require('express-handlebars');
const port = 3001;
const db = 'mongodb://127.0.0.1:27017/Corona';

mongoose.connect(db, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
  })
   .then(console.log("connected successfully to Corona DB"));

app.use(express.json());
app.use(cors())
app.use('/api/member', memberRouter);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}...`)
 })


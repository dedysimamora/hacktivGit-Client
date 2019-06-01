const express = require('express')
const app = express()
const port = 3100
app.use(express.urlencoded({ extended: false }));
 
app.use(express.static(__dirname + '/public'))
app.get('/',(req,res) => {
    res.render('index.ejs')
})
 
 
app.listen(port, () => {
    console.log('this app running on port ' + port)
})


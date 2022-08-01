const express = require('express')
const app = express()
const port = 3003
const {DBConnection} = require('./db');
const {visitsMiddleware} = require("./visitCounterMiddleware")

DBConnection().then(() => {
    app.get('/', visitsMiddleware, (req, res) => {
        res.send('main page')
    })

    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
    })
})


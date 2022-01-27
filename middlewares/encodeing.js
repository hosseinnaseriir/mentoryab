const express = require("express");

const encodeBodyRequests = app => {
    app.use(express.json());
    app.use(express.urlencoded({extended:true}))

}

module.exports = encodeBodyRequests;
const express = require("express");

const encodeBodyRequests = app => {
    app.use(express.json());
    app.use(express.urlencoded());
}

module.exports = encodeBodyRequests;
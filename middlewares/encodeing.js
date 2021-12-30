const express = require("express");

const encodeBodyRequests = app => {
    app.use(express.json());
}

module.exports = encodeBodyRequests;
"use strict";

var config = require("./config/config.json");

var express = require("express"),
    bunyan = require("bunyan"),
    q = require("q"),
    zabbix = new (require("zabbix"))(config.zabbix.url, config.zabbix.user, config.zabbix.pass);

var app = express(),
    logger = bunyan.createLogger({name: "fukukaze", level: "trace"});

zabbix.logger = logger.child({module: "zabbix"});

logger.info("Fhooosh...");

app.use(express.static("static"));

app.use(require("bunyan-request")({
    logger: logger,
}));

app.get("/", function (req, res) {
    q([
        q.ninvoke(zabbix, "discoverApiVersion"),
        q.ninvoke(zabbix, "authenticate"),
    ]).all()
    .then(function(data) {
        //res.send("Wind blows strongly...");
        res.json(data);
    })
    .catch(function(err) {
        res.statusCode(500).send(err);
    });
});

app.listen(1337);

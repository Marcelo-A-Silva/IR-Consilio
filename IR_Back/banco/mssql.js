const mssql = require('mssql');
const config = "Server=192.168.0.50;Database=HELPDESK;User Id=sa;Password=sa@2015;";
const connection = new mssql.ConnectionPool(config.mssql);

module.exports = connection;

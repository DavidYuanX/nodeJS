let mysql = require('mysql');
let sqluser = require('./user.js');
let query = function sqlQuery (sql,data,callback,end) {
    // console.log(sqluser);
    let connection = mysql.createConnection(sqluser);
    // connection.connect();
    connection.query(sql, data, (err, results, fields) => {
        callback && callback(err, results, fields)
        end && connection.end()
    });
}

module.exports = query;

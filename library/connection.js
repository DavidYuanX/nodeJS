let mysql = require('mysql');
let sqluser = {
    host: '',
    user: '',
    password: '',
    database: ''
}
let query = function sqlQuery (sql,data,callback,end) {
    let connection = mysql.createConnection(sqluser);
    connection.query(sql, data, (err, results, fields) => {
        callback && callback(err, results, fields)
        end && connection.end()
    });
}

module.exports = query;

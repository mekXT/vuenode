const mysql = require("mysql");
exports.base = (sql,data,callback)=>{
    let connection = mysql.createConnect({
        host:'localhost',
        user:'root',
        password:'root',
        database:'xtuser'
    })
    connection.connect();
    /*connection.query(sql,data,function(error,results,fields){
        if(error) throw error;
        callback && callback(results)
    })*/
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
        if (err) throw err;
        console.log('The solution is: ', rows[0].solution);
    });
    connection.end();
}

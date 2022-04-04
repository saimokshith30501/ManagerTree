const syncSql = require('sync-sql');
const Api_response = require("./model/api_response");
const con ={
    host:'localhost',
    user:'root',
    password:'root',
    database: 'trees',
    multipleStatements: true
}
module.exports.query = function(query){
       const response = syncSql.mysql(con,query)
       if(response.success){
        if(response.data.rows.length==0){
            return new Api_response(false,"No Record Found",null);
           }
       return new Api_response(true,null,response.data);
       }
       else
       {
        return new Api_response(false,response.data.err.sqlMessage,null);
       }
};


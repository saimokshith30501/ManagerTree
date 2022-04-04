const res = require("express/lib/response");
const db = require("./db_config");

exports.getUsers = function(){
    return db.query("SELECT * FROM empdetails");
}

exports.getAvailableManagers = function(userRole){
    return db.query(`SELECT ID,EmployeeName FROM empdetails where EmployeeRole=${userRole-1}`);
}
exports.getImmediateSub = function(userID){
    return db.query(`select emp.EmployeeName from empdetails as emp where ID = ANY (select map.UserID from empmapping as map where Manager=${userID} and IsImmediateManager=1);`);
}
exports.getAllSub = function(userID){
    return db.query(`select emp.EmployeeName from empdetails as emp where ID = ANY (select map.UserID from empmapping as map where Manager=${userID});`);
}

exports.CreateUser = function(name,role,managerID){
    let result=db.query(`select Manager from empmapping where UserID=${managerID} and Manager!=0 ;INSERT INTO empdetails (EmployeeName,EmployeeRole) values('${name}',${role});`);
    let managers=result.data.rows[0].map(({ Manager }) => Manager);
    let userID = result.data.rows[1].insertId;
    if(managers.length==0){
        if(managerID==0){
            db.query(`INSERT INTO empmapping values(${userID},null,null)`);
        }else{
        db.query(`INSERT INTO empmapping values(${userID},${managerID},1)`);
        }
    }else{
        db.query(`INSERT INTO empmapping values(${userID},${managerID},1)`);
        for (let i = 0; i < managers.length; i++) {
            db.query(`INSERT INTO empmapping values(${userID},${managers[i]},0)`);
          }
    }
    return result;
}


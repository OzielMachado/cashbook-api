const mysql = require("./mysqlConnect");

get= async (query)=>{
    sql=" SELECT * FROM moviment"
    return await  mysql.query(sql);
}

post= async (date, idUser)=>{
    sql="INSERT INTO moviment"
    +" (description, date, value, user_id, type)"
    +" VALUES "
    +"('"+date.description+"', '"+date.date+"', "+date.value+", "+idUser+", '"+date.type+"')";
    const result = await  mysql.query(sql);
    if(result){
        resp={"status":"OK",insertId:result.insertId};
    }else{
        resp={"status":"Error",insertId:result.insertId};
    }
    return resp;
 }

 put= async (date, idUser)=>{
     sql="UPDATE moviments SET "
     +"description='"+date.description+"', date= '"+date.date+"', value="+date.value+", user_id="+idUser+", type='"+date.type+"'" 
     +" WHERE id= "+date.id
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 remove = async (idMov, idUser)=>{
    sql="DELETE INTO moviments"
    +" WHERE id="+idMov;
    const result = await  mysql.query(sql);
    resp=null;
    if(result){
        resp={"status":"OK"};
    }
    return resp;
 }

 cash = async ()=>{
    sql = "SELECT (SELECT SUM(value) FROM moviment WHERE type='input') AS input, (SELECT SUM(value) FROM moviment WHERE type='output') AS output FROM moviment m;"
    const inputOutput= await mysql.query(sql)
    const cash= await mysql.query("SELECT SUM(value) AS saldo FROM moviment")
    cashbalance = null
    
        cashbalance={
            cash: cash,
            inputOutput: inputOutput
        }
    
    return cashbalance
}

io = async ()=>{
    sql = "SELECT DISTINCT date, (SELECT SUM(value) FROM moviment WHERE date=m.date AND type='input') AS input,(SELECT SUM(value) FROM moviment WHERE date=m.date AND type='output') AS output FROM moviment m;"
    const result = await mysql.query(sql)
    return result
}

anoMes = async (data)=>{
    sql = `SELECT *  FROM moviment WHERE type='input' AND YEAR(date)=${data.year} AND MONTH(date)=${data.month}`
    const result = await mysql.query(sql)
    sql2 = `SELECT *  FROM moviment WHERE type='output' AND YEAR(date)=${data.year} AND MONTH(date)=${data.month}`
    const result2 = await mysql.query(sql)
    anoMes = null
    anoMes = {
        input: result,
        output: result2
    }
    return anoMes
}

anoMesMes = async (data)=>{
    sql = `SELECT * FROM moviment WHERE type='input' AND YEAR(date)= ${data.year}
    AND MONTH(date) BETWEEN ${data.month} AND ${data.lastmonth}`
    const resultInput = await mysql.query(sql)
    sql2 = `SELECT * FROM moviment WHERE type='output' AND YEAR(date)= ${data.year}
    AND MONTH(date) BETWEEN ${data.month} AND ${data.lastmonth}`
    const resultOutput= await mysql.query(sql2)
    anoMesMes = null
    anoMesMes = {
        input: resultInput,
        output: resultOutput
    }
    return anoMesMes
}

mesAno = async (data)=>{
    sql = `SELECT * FROM moviment WHERE YEAR(date) = ${data.year} AND MONTH(date) = ${data.month};`
    const result = await mysql.query(sql)
    return result
}




module.exports= {get,post, put, remove, cash, io, anoMes, anoMesMes, mesAno}
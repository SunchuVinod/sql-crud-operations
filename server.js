var express = require("express");
var app = express();
var mysql = require('mysql');
var cors = require("cors");
const { response } = require("express");
const path = require('path');

const PORT = process.env.PORT || 3000

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const con = mysql.createConnection({
    
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
   

});
con.connect((error) =>{
    try{
        if(error){
           
            throw error
        }
        console.log("conected...")
        

    }
    catch(error){
        console.log(error);
    }
});


app.get('/read', async (req,res) =>{

    
  await  con.query('CREATE TABLE IF NOT EXISTS merntable(id int NOT NULL AUTO_INCREMENT PRIMARY KEY,name varchar(255),email varchar(255),password varchar(255)) ', (err,resp)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log('created')
        }
    })
  await  con.query('select * from merntable',(error,response)=>{
        if(error){
            console.log(error)
        }
        else{
            console.log(response)
            console.table(response)
            res.json(response)
        }
    })

 
    
})
app.get('/:id',(req,res)=>{
    const sql = `select * from merntable where id = ${req.params['id']}`;
    con.query(sql,(error,response)=>{
        if(error){
            console.log(error)
        }
        else{
            
            res.json(response)
        }
    })
})
app.post('/',  (req,res)=>{
    const values=[[req.body.name,req.body.email,req.body.password]]
    con.query('insert into merntable (name,email,password) values ?', [values], (error,response)=>{
      if(error){
          console.log(error)
      }
      else{
          res.json('inserted the row')
          console.log('inserted th values')
      }
    }) 
})
app.put('/:id', (req,res)=>{
    console.log()
    const values=[req.body.name, req.body.email, req.body.password, req.params['id']]
    con.query('update merntable set name = ?, email = ?, password = ? where id = ?',values,(error,response)=>{
        if(error){
            console.log(error)
        }
        else{
            res.json('updated the value')
            console.log('updated the value')
        }
    })
   
})


app.delete("/:id", (req,res)=>{

 
 con.query('DELETE FROM merntable WHERE id = ?',[req.params['id']],(error,response)=>{
    if(error){
        console.log(error)
    }
    else{
        res.send('deleted')
        console.log('deleted the row')
    }
 })
})





app.listen(3000, ()=>{
    console.log("listening on 3005")
})
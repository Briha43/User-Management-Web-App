import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import express, { urlencoded } from 'express';
import methodOverride from "method-override";
const app = express();
import path from "path";
import session from 'express-session';
import flash from 'connect-flash';

app.use(session({
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

// Make flash messages available in all views
app.use((req, res, next) => {
    res.locals.messages = req.flash();
    next();
});

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "/views"));
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));


// Create the connection to database
const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password:'brihamalik@2243'
});

app.get("/",async (req,res)=>{
    let query="select count(*) from user;";
//using placeholders
try {
  const [results] = await connection.query(query);
  console.log(results);
  console.log(results[0]["count(*)"]);
  let count=results[0]["count(*)"];
  res.render("home.ejs",{count});
} 
catch (err) {
  console.log(err);
 res.status(500).send("Some error in database");
}
})

app.get("/users",async (req,res)=>{
    let query="select * from user;";
    try {
  const [results] = await connection.query(query);
  const count = results.length;
  const success = req.query.success === "true"; // check for flag
  res.render("showusers.ejs", { results, count, success });
//   console.log(results); // results contains rows returned by server
//   res.render("showusers.ejs",{results});
} catch (err) {
  console.log(err);
  res.send("some error in db");
}
})

app.get("/user",(req,res)=>{
    res.render("newuser.ejs");
})

app.post("/users",async (req,res)=>{
    console.log(req.body);
    let{username,password,email}=req.body;
    let id=createRandomUser().userId;
    console.log(id);
    let Addquery=`insert into user(id,username,email,password) values ("${id}","${username}","${email}","${password}");`;
    try {
    const [results] = await connection.query(Addquery);
    console.log(results); 
    res.redirect("/users?success=true");
    } catch (err) {
    console.log(err);
    res.send("some error in db");
}
})

app.get("/user/:id/edit",async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    let query=`select * from user where id="${id}";`;
    try {
  const [results] = await connection.query(query);
  console.log(results[0]); // results contains rows returned by server
  let user=results[0];
  res.render("edit.ejs",{user});
} catch (err) {
  console.log(err);
  res.send("some error in db");
}
})

app.patch("/user/:id",async (req,res)=>{
    let {id}=req.params;
    console.log(req.body);
    let {username,password}=req.body;
    // console.log(`user is ${username} with pass=${password}`);
    console.log(id);
    let query=`select * from user where id="${id}";`;
    try {
    const [results] = await connection.query(query);
    console.log(results[0]); // results contains rows returned by server
        if(password!=results[0].password){
            res.send("wrong password");
        }
        else{
            let newQuery=`update user set username='${username}' where id='${id}'`;
            // res.send('success');
            const [result] = await connection.query(newQuery);
            console.log(result); // results contains rows returned by server
            res.redirect("/users");
        }
} catch (err) {
  console.log(err);
  res.send("some error in db");
}
})

app.get("/user/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    res.render("deleteuser.ejs",{id});
})

app.delete("/user/:id",async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    console.log(req.body);
    let {email,password}=req.body;
    // console.log(`user is ${username} with pass=${password}`);
    let query=`select * from user where id="${id}";`;
    try {
    const [results] = await connection.query(query);
    console.log(results); // results contains rows returned by server
        if(password!=results[0].password || email!=results[0].email){
            req.flash("error", "Wrong password");
            return res.redirect(`/user/${id}`);
        }
        else{
            let delQuery=`DELETE FROM user WHERE id='${id}'`; // ✅ Correct
            const [result] = await connection.query(delQuery);
            console.log(result[0]); // results contains rows returned by server
            res.redirect("/users");
        }
} catch (err) {
  console.log(err);
  res.send("some error in db");
}
})



app.listen(8080, ()=>{
    console.log("server is listening on port 8080");
})


// connection.end();

let createRandomUser= ()=> {
  return {
    userId: faker.string.uuid(),
  };
}
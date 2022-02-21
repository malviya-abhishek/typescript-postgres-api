import express, { Request, Response, NextFunction} from 'express';
import path from 'path';

const app: express.Application = express();


import * as dotenv from "dotenv";

dotenv.config( { path: path.join( __dirname, '../.env')  } );

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { home, getUsers, getUser, createUser, updateUser, deleteUser   }  = require("./users.controller");



app.get("/", home);
app.get("/users", getUsers );
app.get("/users/:id", getUser );
app.post("/users", createUser);
app.put("/users/:id", updateUser);
app.delete("/users/:id", deleteUser);

app.listen( process.env.PORT , ()=>{
    console.log("Server is live at port", process.env.PORT);
})
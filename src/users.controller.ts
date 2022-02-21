import {Pool} from "pg";
import { Request, Response } from "express";


const pool = new Pool(
    {
        host: process.env.DB_HOST as string,
        port: parseInt(process.env.DB_PORT as string),
        user: process.env.DB_USER as string,
        password: process.env.DB_PASSWORD as string,
        database: process.env.DB_DATABASE as string,
    }
);


function home(req: Request, res: Response){
    res.json({info : "NodeJs TypeScript Postgres api"})
}

function getUsers(req : Request , res: Response) {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, result) => {
    if (error) {
      console.error(error);
      res.json({ msg: "error occured" });
    } else res.status(200).json(result.rows);
  });
}

function getUser(req: Request, res: Response){
    const id = parseInt(req.params.id);
    pool.query(`SELECT * FROM users WHERE id =  $1`, [id], (error, result)=>{
        if (error) {
          console.error(error);
          res.json({ msg: "error occured" });
        } else res.status(200).json(result.rows);
    })
}

function createUser(req: Request, res: Response){
    const {name, email} = req.body;
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, result)=>{
        if (error) {
          console.error(error);
          res.status(500).json({ msg: "error occured" });
        } else res.status(201).json({ "rows updated": result.rowCount, name : name, email : email });
    })
}

function updateUser(req: Request, res: Response){
    const id = parseInt(req.params.id);
    const {name, email} = req.body;
    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3', 
        [name, email, id],
        (error, result)=>{
          if (error) {
            console.error(error);
            res.json({ msg: "error occured" });
         } 
        else 
            res.status(200).json(`rows updated ${result.rowCount}`);
        }
    )
}

function deleteUser(req: Request, res: Response){
    const id = parseInt(req.params.id);
    pool.query(
        'DELETE FROM users WHERE id = $1',
        [id],
        (error, result) =>{
            if(error){
                console.error(error);
                res.status(500).json({msg : 'error occured'})
            }
            else
                res.status(200).json(`rows updated ${result.rowCount}`)
        }
    )
}

module.exports = {
  home,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};

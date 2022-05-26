const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db"); 

//middleware
app.use(cors());
app.use(express.json()); // req.body
//line 7 gives us access to request.body so that we can get json data

//Routes:
//create a todo

app.post("/todos", async(req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO geterdone (description) VALUES($1) RETURNING *", 
            //returning * is used whenever you're inserting data or updating or deleting 
            [description]
            //description is the value of $1; $1 is just a placeholder 
            //$1 allows us to put in some variables for what we're trying to add to the database
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//it will be post bc we're adding data 

//get all todos
app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM geterdone");
        res.json(allTodos.rows);
        //you don't have to use returning * here bc you already did SELECT FROM in line 35; that gives you data back
    } catch (err) {
        console.error(err.message)
    }
});

//get a todo

app.get("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM geterdone WHERE geterdone_id = $1", [
            id
        ]);

        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})
//this route path will allow our URL to be dynamic 


//update a todo

app.put("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE geterdone SET description = $1 WHERE geterdone_id = $2", 
        [description, id]
        );

        res.json("Todo was updated!");
    } catch (err) {
        console.error(err.message);
    }
});


//delete a todo

app.delete("/todos/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM geterdone WHERE geterdone_id = $1", [
            id
        ]);
        res.json("Todo was deleted!");
    } catch (err) {
        console.log(err.message)
    }
});



app.listen(3001, () => {
    console.log("server has started on port 3001")
})
//any time you want the server to start, you have to listen to a port number 
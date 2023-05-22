const express = require("express");
const app = express();
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
app.use(express.json());


const welcome = (req, res) => { res.send("Welcome to my favourite movie list"); };


app.get("/", welcome);
// Routes pour les films

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

// Routes pour les utilisateurs

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

const port = process.env.APP_PORT ?? 5000;

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});



//poster des films et utilisateurs
app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", userHandlers.postUser)


//modification
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", userHandlers.updateUser);

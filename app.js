const express = require("express");
const app = express();
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

const port = process.env.APP_PORT ?? 5000;
app.use(express.json());
// Partie pour ce loguer



const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");

const welcome = (req, res) => { res.send("Welcome to my favourite movie list"); };


app.get("/", welcome);
// Routes pour les films

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

// Routes pour les utilisateurs

app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/users", hashPassword, userHandlers.postUser)

app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);


app.use(verifyToken);

//poster des films et utilisateurs
app.post("/api/movies", verifyToken, movieHandlers.postMovie);



//modification
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser)

//suppression

app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
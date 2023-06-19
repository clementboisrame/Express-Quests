const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// ...



const verifyPassword = (req, res) => {
    argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };
        console.log('coucou',payload);
        
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        }); 
        
        delete req.user.hashedPassword; 
        res.send({ token, user: req.user }); 
    } else {
        res.sendStatus(401); 
    }
})
.catch((err) => {
    console.error(err);
      res.sendStatus(500); 
    });
};

// Fonction pour hacher le mot de passe
const hashPassword = (req, res, next) => {
    argon2
    .hash(req.body.password, hashingOptions) 
    .then((hashedPassword) => {
        console.log(hashedPassword);
        
        req.body.hashedPassword = hashedPassword; 
        delete req.body.password; 
        
        next(); // Appel de la fonction middleware suivante
    });
};
        //verification du token
        const verifyToken = (req, res, next) => {
            try {
              const authorizationHeader = req.get("Authorization");
          
              if (authorizationHeader == null) {
                throw new Error("Authorization header is missing");
              }
          
              const [type, token] = authorizationHeader.split(" ");
          
              if (type !== "Bearer") {
                throw new Error("Authorization header has not the 'Bearer' type");
              }
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(401);
    }
  };
  

module.exports = {
    hashPassword,
    verifyPassword,
  verifyToken,
};

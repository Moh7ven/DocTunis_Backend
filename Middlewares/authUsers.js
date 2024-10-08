import jwt from "jsonwebtoken";

export default (req, res, next) => {
  // Vérification du token
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decoded.userId;

    req.auth = { userId: userId };

    if (!req.auth.userId) {
      res.status(401).json({
        error: "Invalid user ID",
        message: "Authentification echouée, Vous n'êtes pas autorisé",
        status: false,
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: error,
      message: "Authentification echouée. Veuillez vous connecter",
    });
  }
};

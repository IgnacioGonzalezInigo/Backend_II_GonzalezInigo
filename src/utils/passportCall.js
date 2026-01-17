import passport from "passport";

export function passportCall(strategy) {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({ status: "error", msg: err.message });
      }

      if (!user) {
        return res.status(401).json({
          status: "error",
          msg: "Unauthorized",
          details: info?.message || info || "No token / invalid token"
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
}

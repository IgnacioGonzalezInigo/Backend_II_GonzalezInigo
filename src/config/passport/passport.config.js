import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

export function initializePassport() {

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no definido en variables de entorno");
  }

  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  };

  passport.use(
    "jwt",
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = jwt_payload?.user;

        if (!user) {
          return done(null, false, { message: "Token payload inválido" });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

  return passport;
}
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const avatar = profile.photos[0].value;
        const displayName = profile.displayName;

        // 1️⃣ FIRST: Check if user already exists by Google ID
        let user = await User.findOne({ googleId });

        if (user) {
          // Update avatar if changed
          user.avatar = avatar;
          await user.save();
          return done(null, user);
        }

        // 2️⃣ SECOND: Check if a local account exists with same email
        const existingEmailUser = await User.findOne({ email });

        if (existingEmailUser) {
          // Case A: Local user exists → DO NOT MERGE INTO SAME USER
          // Create a separate Google account
          user = await User.create({
            username: displayName,
            email: `${email}_google_${googleId}`, // avoid email conflict
            googleId,
            authProvider: "google",
            avatar,
          });

          return done(null, user);
        }

        // 3️⃣ THIRD: No user found → Create new Google account
        user = await User.create({
          username: displayName,
          email,
          googleId,
          authProvider: "google",
          avatar,
        });

        return done(null, user);

      } catch (error) {
        console.error("Google Auth Error:", error);
        done(error, null);
      }
    }
  )
);

// ❌ NO serializeUser / deserializeUser
// We are NOT using session-based login

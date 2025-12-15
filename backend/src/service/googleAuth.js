const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://habitracker-y4i5.onrender.com/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const googleId = profile.id;
        const email = profile.emails[0].value;
        const googleAvatar = profile.photos[0].value;
        const displayName = profile.displayName;

        // 1️⃣ Check if Google user already exists
        let user = await User.findOne({ googleId });

        if (user) {
          // ⭐ DO NOT OVERWRITE avatar if user uploaded custom avatar
          const isGoogleAvatar = user.avatar?.includes("googleusercontent");

          if (!user.avatar || isGoogleAvatar) {
            user.avatar = googleAvatar;
            await user.save();
          }

          return done(null, user);
        }

        // 2️⃣ Check if local account exists by email
        const existingEmailUser = await User.findOne({ email });

        if (existingEmailUser) {
          // Create separate Google account to avoid merge
          user = await User.create({
            username: displayName,
            email: `${email}_google_${googleId}`,
            googleId,
            authProvider: "google",
            avatar: googleAvatar,
          });

          return done(null, user);
        }

        // 3️⃣ New Google user → create account
        user = await User.create({
          username: displayName,
          email,
          googleId,
          authProvider: "google",
          avatar: googleAvatar,
        });

        return done(null, user);

      } catch (error) {
        console.error("Google Auth Error:", error);
        return done(error, null);
      }
    }
  )
);


import passport from "passport";
import {Strategy as GoogleStrategy} from "passport-google-oauth2"
import dotenv from "dotenv"
import User from "../app/Models/User.js";
dotenv.config()
passport.use(new GoogleStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:process.env.NODE_ENV === "production" ? "https://windahouseware.vercel.app/google/callback" :"http://localhost:5001/google/callback"
},async(accessToken,refreshToken,profile,cb)=>{
        try {
            let user = await User.findOne({googleId:profile.id})
            if(!user){
                user = await User.create({
                    username:profile.given_name || profile.displayName,
                    googleId:profile.id,
                    email:profile.emails[0].value,
                    avatar:profile.photos[0].value
                })
            }
             return cb(null,user)
        } catch (error) {
           return  cb(error,null)
        }
}))

passport.serializeUser((user,cb)=>{
    cb(null,user.id)
})

passport.deserializeUser(async(id,cb)=>{
    try {
        const user = await User.findById(id)
        cb(null,user)
    } catch (error) {
        cb(error,null)
    }
})

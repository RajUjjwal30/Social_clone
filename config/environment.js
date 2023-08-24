


const development = {
    name: 'development',
    asset_path : './assets',
    session_cookie_key : 'blahsomething',
    db: 'social_clone_development',


    google_client_id: "1021224603731-1rbmg913tholnh27dpfhbfdaepflveft.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:1000/users/auth/google/callback",

    jwt_secret: 'social_clone'
}

const production = {
    name: 'production',
    asset_path : process.env.SOCIAL_CLONE_ASSET_PATH,
    session_cookie_key : process.env.SOCIAL_CLONE_SESSION_COOKIE_KEY,
    db: process.env.SOCIAL_CLONE_DB,


    google_client_id: process.env.SOCIAL_CLONE_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIAL_CLONE_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.SOCIAL_CLONE_GOOGLE_CALL_BACK_URL,

    jwt_secret: process.env.SOCIAL_CLONE_JWT_SECRET
}

//eval : if there is string 2+2 then it evaluates it into expression,
//so,if there is string saying 'development' it evaluates it into variable.
module.exports = eval(process.env.SOCIAL_CLONE_ENVIRONMENT) == undefined ? development : eval(process.env.SOCIAL_CLONE_ENVIRONMENT);
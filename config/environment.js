const { cookie } = require("express/lib/response");


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
    name: 'production'
}


module.exports = development;
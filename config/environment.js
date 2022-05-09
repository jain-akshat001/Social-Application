

const development = {
    name: 'development',
    asset_path: '/assets',
    session_cookie_key: 'blahsomething',
    db: 'social_development',
    google_client_id: "313233209747-dnqmail3j800a2jvsuckqhohodhs7i63.apps.googleusercontent.com",
    google_client_secret: "0FXb5EBWa4xRfJ8jR-1HKMd2",
    google_callback_URL: "http://localhost:8000/users/auth/google/callback", 
    jwt_secret: 'codeial',
}

const production = {
    name: 'production'
}


module.exports = development;

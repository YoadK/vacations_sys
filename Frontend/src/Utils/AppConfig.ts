class AppConfig {

    // Backend urls:
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/";
    public readonly vacationsWithLikesUrl = "http://localhost:4000/api/vacations-with-likes/";    
    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/";
    

    //Axios options:
    public readonly axiosOptions = {
        headers: { // Tell axios to also send the image:
            "Content-Type": "multipart/form-data" // We're sending also files.
        }
    };
}

export const appConfig = new AppConfig();

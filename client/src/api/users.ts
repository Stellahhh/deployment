import axios from 'axios'


// const { config } = require("dotenv");
// config();
// const { createClient } = require("@supabase/supabase-js");

// Initialize Supabase client
// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// module.exports = { supabase };




// const URL = process.env.REACT_APP_SERVER_URL
const API_URL = "http://localhost:8000/api/v1"



// Login, store the token, and return the user


export const login = async (
    email: string,
    password: string,
) => {
    // console.log(URL);

    // const response = await fetch(`${API_URL}/users/signin`, {
    //     method: "POST",
    //     // headers: {
    //     //     "Content-Type": "application/json",
    //     // },
    //     body: JSON.stringify({ email, password }),
    // });

    const response = await axios.post(`${API_URL}/users/signin`, {
        email, password
    })

    // console.log(response)


    return response.data
    // const responseJson = await response.json();

    // if (!response.ok) {
    //     throw new Error(
    //         `Error: ${response.status} - ${responseJson.message || response.statusText
    //         }`,
    //     );
    // }

    // const { access_token } = responseJson.data;
    // if (!access_token) {
    //     throw new Error("Authentication token is missing from the response!");
    // }

    // storeAuthenticatedUserToken(access_token);
    // const user = getAuthenticatedUser();
    // return user;
};

// Logout and clear the token
// export const logout = async (): Promise<void> => {
//     // You can send a request to the server to perform server-side logout
//     // Here we just clear the token
//     removeAuthenticatedUserToken();
// };

// // Register a new user
// export const register = async (
//     username: string,
//     password: string,
// ): Promise<void> => {
//     const response = await fetch(`${API_URL}/users/register`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//     });
//     const responseJson = await response.json();

//     if (!response.ok) {
//         throw new Error(
//             `Error: ${response.status} - ${responseJson.message || response.statusText
//             }`,
//         );
//     }
// };

// const handleError = (response: Response, message?: string) => {
//     if (response.status === 401) {
//         removeAuthenticatedUserToken();
//         throw new Error("error in API call. Please login again.");
//     }

//     throw new Error(
//         `Error: ${response.status} - ${message || response.statusText}`,
//     );
// };
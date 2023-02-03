import axios from "axios";

const API_KEY = "AIzaSyBFyIJ-sUgtFQGBFYYBiy32CZeq-pz3xy0";

//mode is the dynaimcally generated url on login or sign in logic
//this authenticate function is the holder of most this logic
async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;

  return token;
}

//both of these functions return this promise made by authenticate() which holds the email/pw info and our promised token form fb
export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

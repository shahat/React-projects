import { redirect } from "react-router-dom";

// return the duration of the token in milliseconds
export function tokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;

}
// ====================
// get token from local storage 
// ====================
// this function is used to get the token from local storage and check if it is expired or not
export default function getToken  ()  {
  const token =  localStorage.getItem('token');
  const currentTokenDuration = tokenDuration();
  if (!token) {
    return null;
  }
  if (currentTokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
};  

// ====================
// token loader 
// ====================
// this loader is used to get the token from local storage 
export const tokenLoader = () => {
  return getToken();
}

// ====================
// auth loader 
// ====================
// this loader is used to protect the routes that need authentication
export const authLoader = () => {
  const token = getToken();
  if (!token) {
    redirect('/auth');
  }
}
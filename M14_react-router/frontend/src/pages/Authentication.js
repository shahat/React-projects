import AuthForm from '../components/AuthForm';
import { json, redirect } from 'react-router-dom';
function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export const action = async ({ request }) => {
  // get search params from the URL bcz this is not react component
  const searchParams = new URL(request.url).searchParams;
  // get the mode from the URL
  const mode = searchParams.get('mode') || 'login';
  // get the form data
  const data = await request.formData();
  const authDate = {
    email: data.get('email'),
    password: data.get('password'),
  };
  if (mode !== 'login' && mode !== 'signup') {
       throw json({ message: 'unknown mode' }, { status: 422 });
  }
  const response = await fetch('http://localhost:8080/'+ mode, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(authDate),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: 'Could not authenticate user' }, { status: 500 });
  }
  const resData = await response.json();
  const token = resData.token;
  localStorage.setItem('token', token);
  // once you set the token in the front end you set the expiration date : 
  
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString()); 
   return redirect('/');
}
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {

  const provider = new GoogleAuthProvider();

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Login exitoso:", result.user);
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
    }
  };

  return (
    <button
      className="btn-login"
      onClick={googleLogin}
    >
      <i className="fa-brands fa-google"></i>
      Sign in with Google
    </button>
  );
}

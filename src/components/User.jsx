import Login from './Login'
import Logout from './Logout'
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function User() {

  
  const [user] = useAuthState(auth);
  console.log("user:", user);
  
  const profileImage = user ? user.photoURL : "/userImage.png";
  const name = user ? user.displayName : "Name User";

  return (
    <div className='right-side'>
      <h1><i className="fa-solid fa-cat"></i>QuickChat</h1>
      <article className='card-user'>
        <img src={profileImage} alt="user photo" referrerPolicy='no-referrer'/>
        <p>{name}</p>

        { user ? <Logout/> : <Login/> }

      </article>
      
    </div>
  )
}

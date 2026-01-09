import { auth } from '../firebase'
import { formatDate } from './helpers';


export default function Message({ message }) {

  let newStyle = 'message';

  if(auth.currentUser){
    const user = auth.currentUser.uid;
    const uidMessage = message.uid;
    newStyle = (user === uidMessage) ? 'my-message' : 'message';
  }

  const image = (message.photo != null) ? message.photo : "/userImage.png";
  
  return (
    <article className={newStyle}>
      <img src={image} alt="user photo" />

      <div className="bubble">
        <p className="user">{message.name}</p>

        <div className="text-message">
          <p className="text">{message.text}</p>
        </div>

        <p className="time">{formatDate(message.timestamp)}</p>
      </div>
    </article>

  )
}

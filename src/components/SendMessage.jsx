import React, { useState } from 'react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../firebase'
import EmojiPicker from 'emoji-picker-react';


export default function SendMessage() {

  const [input, setInput] = useState("");
  const [open, setOpen] = useState('close');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, displayName, photoURL } = auth.currentUser;

    await addDoc(collection(db, 'messages'), {
      text: input,
      name: displayName,
      uid: uid,
      photo: photoURL,
      timestamp: serverTimestamp()
    });

    setInput("");

  }

  const emoji = () => setOpen('open')
  const closeEmoji = () => setOpen('close')

  const onEmojiClick = (emojiData) => {
    setInput(`${input}${emojiData.emoji}`)
  }

  return (
    <form onSubmit={sendMessage} >

      <button
        type='button'
        className='btn-emoji'
        onClick={emoji}
      >
        <i className="fa-regular fa-face-laugh-squint"></i>
      </button>

      <div className={open}>
        <button
          type='button'
          className='close-emoji'
          onClick={closeEmoji}
        >
          <i className="fa-solid fa-x"></i>
        </button>
        <EmojiPicker onEmojiClick={onEmojiClick}/>
      </div>

      <input type="text" 
        placeholder='Enter your message here.'
        value={input}
        onChange={e=>setInput(e.target.value)}
      />

      <button type='submit'>Send</button>
    </form>
  )
}

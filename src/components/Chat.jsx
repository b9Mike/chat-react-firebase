import React, { useEffect, useState } from 'react'
import { auth, db } from "../firebase";
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import Message from './Message';

export default function Chat() {

  const [messages, setMessages] = useState([]);

  useEffect(() => {

    const newQuery = query(collection(db, 'messages'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(newQuery, (querySnapshot) => {
      let currentMessages = [];

      querySnapshot.forEach(item => {
        currentMessages.push({ content: item.data(), id: item.id })
        console.log(item.data());
      })
      setMessages(currentMessages);
    })

    return unsubscribe;

  })
  
  return (
    <section className='chat-content'>
      {
        messages && messages.map(item => (
          <Message
            key={item.id}
            message={item.content}
          />

        )) 
      }
    </section>
  )
}

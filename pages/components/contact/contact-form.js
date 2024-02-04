
import { useEffect, useRef, useState } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';


async function sendContactData(contactDetails) {
  const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactDetails)
    })

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong!');
    }
}

const ContactForm = () => {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState()
  const [enteredValue, setEnteredValue] = useState({
    email: '',
    name: '',
    message: ''
  })


  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null)
      }, 3000)

      return () => clearTimeout(timer);
    }
  }, [requestStatus])

  const OnchangeHandler = (event) => {
    const { name, value } = event.target;
    setEnteredValue(prevObj => {
      return {
        ...prevObj,
        [name]: value
      }
    })
  }
  const sendMessageHandler = async (event) => {
    event.preventDefault();


    setRequestStatus('pending');

    try {
      await sendContactData({
        email: enteredValue.email,
        name: enteredValue.name,
        message: enteredValue.message,
      });

      setRequestStatus('success');
      setEnteredValue({
        email: '',
        message: '',
        name: ''
      })
    } catch (error) {
      setRequestError(error.message)
     setRequestStatus('error');     
    }

  }


  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!'
    }
  }

  if (requestStatus === 'success') {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }
  return (
    <section className={classes.contact}>
      <h1>How can i help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor='email'>Your Email</label>
            <input type='email' id='email' name='email' onChange={OnchangeHandler} value={enteredValue.email} required />
          </div>
          <div className={classes.control}>
            <label htmlFor='name'>Your Name</label>
            <input type='text' id='name' name='name' onChange={OnchangeHandler} value={enteredValue.name} required />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor='message'>Your Message</label>
          <textarea id='message' rows='5' name='message' onChange={OnchangeHandler} value={enteredValue.message}></textarea>
        </div>

        <div className={classes.action}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
     </section>
  )
}

export default ContactForm
import { useEffect, useState } from 'react';
import classes from './ContactForm.module.css';
import Notification from '../ui/Notification';

async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method : 'POST',
        body : JSON.stringify(contactDetails),
        headers : {
            'Content-Type' : 'application/json'
        }
    });

    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
    }
};

const ContactForm = () => {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredName, setEnteredName] = useState('');
    const [enteredMessage, setEnteredMessage] = useState('');
    const [requestStatus, setRequestStatus] = useState(); // pending, success or error
    const [error, setError] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestStatus(null);
                setError(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    },[requestStatus])


    async function sendMessageHandler(event) {
        event.preventDefault();

        setRequestStatus('pending');

       try {
            await sendContactData({
                email : enteredEmail,
                name : enteredName,
                message : enteredMessage
            });

            setRequestStatus('success')

            setEnteredEmail('');
            setEnteredName('');
            setEnteredMessage('');
       } catch (error) {
        setRequestStatus('error');
        setError(error.message);
       }

    };

    let notificationData;

    if (requestStatus === 'pending') {
        notificationData = {
            status : 'pending',
            title : 'Sending message...',
            message: 'Your message is on its way!'
        };
    }

    if (requestStatus === 'success') {
        notificationData = {
            status : 'success',
            title : 'Success!',
            message: 'Message sent successfully!'
        };
    }

    if (requestStatus === 'error') {
        notificationData = {
            status : 'error',
            title : 'Error!',
            message: error
        };
    }


    return (
        <section className={classes.contact}>
            <h1>How Can I Help You?</h1>

            <form onSubmit={sendMessageHandler} className={classes.form}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Your Email</label>
                        <input value={enteredEmail} onChange={(event) => setEnteredEmail(event.target.value)} type='email' id='email' required />
                    </div>

                    <div className={classes.control}>
                        <label htmlFor='name'>Your Name</label>
                        <input value={enteredName} onChange={(event) => setEnteredName(event.target.value)} type='text' id='name' required />
                    </div>
                </div>

                <div className={classes.control}>
                    <label htmlFor='message'>Your Message</label>
                    <textarea value={enteredMessage} onChange={(event) => setEnteredMessage(event.target.value)} id='message' rows='5' required>
                    </textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>

            {notificationData && <Notification status={notificationData.status} title={notificationData.title} message={notificationData.message} />}
        </section>
    )
}

export default ContactForm;
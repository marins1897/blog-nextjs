import { MongoClient } from "mongodb";
const url = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_database}.zuo0mwv.mongodb.net/?retryWrites=true&w=majority`;

async function handler (req, res) {
    if (req.method === 'POST') {
        const {email, name, message} = req.body;

        if(!email.includes('@') || !email || !name || name.trim() === '' || !message || message.trim() === '') {
            res.status(422).json({ message : 'Invalid input.' });
            return;
        }

        // store it in a database
        const newMessage = {
            email,
            name,
            message
        };

        console.log(newMessage);

        let client;

        try {
            client = await MongoClient.connect(url, )
        } catch (error) {
            res.status(500).json({ message : 'Failed to connect to database!'});
            return;
        }


        const db = client.db();

        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({ message : 'Failed to store new message!'});
            return;
        }

        client.close();

        res.status(201).json({ message : 'Successfully stored message!', newMessage : newMessage });
    }
}

export default handler;
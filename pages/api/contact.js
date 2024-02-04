import { MongoClient } from "mongodb";

 async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      !name.trim() === "" ||
      !message ||
      !message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid Input" });
      return;
    }

    
    const newMessage = {
      email,
      name,
      message
    }

    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb__username}:${process.env.mongodb__password}@${process.env.mongodb__clustername}.nlxkjpc.mongodb.net/${process.env.mongodb__database}?retryWrites=true&w=majority`;
    
   try {
     client = new MongoClient(connectionString,
       {
         useNewUrlParser: true,
         useUnifiedTopology: true,
       }
     )

     await client.connect();
   } catch (error) {
     res.status(500).json({ message: "Could not connect to database" });
     return;
   }

    const db = client.db()

     try {
        await db
         .collection("posts")
         .insertOne(newMessage);

       res.status(201).json({ message: "Successfully stored Message" });
     } catch (error) {
       res.status(500).json({ message: "Storing message failed!" });
     } finally {
       await client.close();
     }

  }
}

export default handler

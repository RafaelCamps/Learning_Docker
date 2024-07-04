import { connect } from "mongoose";

import Book from "../models/BookModel.js";


const initialBooks = [
    { 
        id: 1,
        title: "1984",
        author: "George Orwell"
    },
    { 
        id: 2,
        title: "A brave new world",
        author: "Aldous Huxley"
    },
    { 
        id: 3,
        title: "The catcher in the rye",
        author: "J.D. Salinger"
    },
]

const initializeBookData = async () => {
    const booksExist = await Book.countDocuments();
    if(booksExist === 0){
        console.log("Seeding the database with initial")
        await Book.insertMany(initialBooks);
        console.log("Database seeded succesfully")
    }else{
        console.log("Books already exist in the database")
    }
}

const dbStart = () => {
    connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> {
        console.log("MongoDB connected:" + process.env.DATABASE_URL)
        initializeBookData()
    })
    .catch((err) => console.log("MongoDB connection error:", error))
}

export default dbStart;
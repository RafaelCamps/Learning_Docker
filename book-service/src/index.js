import express from "express";
import dotenv from "dotenv";

const app = express();
const port = 3000;
dotenv.config();

const books = [
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

app.get("/books", async (req, res) => {
    res.json(books)
});

app.listen(port, () => {
    console.log(`Book Service running at http://localhost:${port}`);
});
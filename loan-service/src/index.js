import express from "express"
import fetch from "node-fetch"
import dotenv from "dotenv"

const app = express()
const port = 3001

dotenv.config()

const loans = [
    {bookId: 1, userName: "Alice", loanDate: "2023-04-01"},
    {bookId: 2, userName: "Bob", loanDate: "2023-04-15"},
    {bookId: 3, userName: "Charlie", loanDate: "2023-05-03"}
]

//Seteamos el endpoing para este servicio, si se llama desde fuera del docker-compose, llamará a localhost, si no llamará al contenido de la variable de entorno
const bookServiceEndpoint = process.env.BOOK_SERVICE_URL || "http://localhost:3000"

app.get("/loans", async (req, res) => {
    try {
        //Fetch the books from book service
        const response = await fetch(`${bookServiceEndpoint}/books`)
        if(!response.ok){
            throw new Error("Failed to fetch books")
        }
        const books = await response.json()

        //Para cada registro de loan, vamos a buscar los datos del libro en la respuesta del fetch y lo añadimos a los datos del loan
        const loanDetails = loans.map((loan) => {
            const bookDetails = books.find((book) => book.bookId === loan.bookId)
            return {
                userName: loan.userName,
                loanDate: loan.loanDate,
                book: bookDetails
            }
        })
        res.json(loanDetails);

    } catch (error) {
        console.error("Error fetching book details: ", error)
        res.status(500).send("Failed to fecth book details");
    }
})


app.listen(port, () => {
    console.log(`Loan service running at http://localhost:${port}`)
})
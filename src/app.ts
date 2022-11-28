import http from 'http'
import path from 'path'
import express, { Express, Request, Response } from 'express'
import { Server } from 'socket.io'

import dotenv from 'dotenv'

const app: Express = express()
const server = http.createServer(app)
const io = new Server(server)

dotenv.config()

const port = process.env.API_PORT

app.use(express.json())
app.use(express.static('public'))

type Drink = {
  name: string
  count: number
  price: number
}

const drinks: Array<Drink> = [
  { name: "beer", count: 0, price: 5},
  { name: "wine", count: 0, price: 7},
  { name: "champagne", count: 0, price: 15},
  { name: "cocktail", count: 0, price: 10},
]

// TODO: let's enhance this later
const calcPrices = (): Array<number> => {
  const sum = drinks.reduce((acc, curr) => (acc + curr.count), 0 )
  return drinks.map(drink => (drink.count + 1) / sum * drink.price)
}

app.get('/', (req: Request, res: Response) => {
  res.sendFile('index.html', {root: path.join(__dirname, '..', 'client')})
})

app.post('/increment', (req:Request, res:Response) => {
  const { drinkName } = req.body
  for (const drink of drinks) {
    if (drink.name === drinkName) {
      drink.count ++
    }
  }
  res.json({drinks, prices: calcPrices()})
})

io.on('connection', (socket) => {
  console.log('a user connected')
})

server.listen(port, () => {
  console.log(`⚡️[server]: Express is running at https://localhost:${port}`)
})

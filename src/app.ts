import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app: Express = express()
const port = process.env.API_PORT

app.use(express.json())

// my database
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
  const prices = calcPrices()
  res.send(`beer price: ${prices[0]}`) 
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

app.listen(port, () => {
  console.log(`⚡️[server]: Express is running at https://localhost:${port}`)
})

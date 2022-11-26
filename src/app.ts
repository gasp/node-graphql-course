import http from 'http'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { schema } from './schema.js'
import dotenv from 'dotenv'
import { makeExecutableSchema } from '@graphql-tools/schema'

type MyContext = {
  token?: String
}

dotenv.config()
const port = process.env.API_PORT

const app: Express = express()
const httpServer = http.createServer(app)

const server = new ApolloServer<MyContext>({
  schema: schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
})

// Ensure we wait for our server to start
await server.start()

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
)

app.get('/', (req: Request, res: Response) => {
  res.send('Express + Apollo + TypeScript Server')
})

app.get('/health', (req: Request, res: Response) => {
  res.send('i am alive')
})

await new Promise<void>(resolve => httpServer.listen({ port }, resolve))
console.log(`⚡️[server]: Server running at https://localhost:${port}`)

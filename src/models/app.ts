import express, { Application } from "express"
import cors from "cors"
import morgan from "morgan"
import * as dotenv from "dotenv"
import { pingRouter } from '../routes/ping.router'
import { checkTokenMiddleware } from "../middlewares/auth.middleware"

export class App {
  // initializers
  private app: Application
  private port = 3000
  private apiVersion = "v1"
  private apiPaths = {
    ping: `/api/${this.apiVersion}/ping`
  }

  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
    dotenv.config({ quiet: true })
  }

  // middlewares
  private middlewares() {
    // json parser
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(morgan("combined"))
  }

  // routes invocation
  private routes() {
    this.app.use(this.apiPaths.ping, checkTokenMiddleware, pingRouter)
  }

  // start server
  public start() {
    this.app.listen(this.port, () => {
      console.log("App online in port:", this.port)
    })
  }
}

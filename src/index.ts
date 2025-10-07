import { App } from './models/app';
import * as dotenv from "dotenv"
dotenv.config()

const app = new App()
app.start()

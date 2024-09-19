import express, { Response, Request } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { registerRouter } from "./auth/routes/registerRoute";
import { loginRouter } from "./auth/routes/loginRoute";
import { validateRouter } from "./auth/routes/validateUserRoute";

const app = express();

const PORT = 4000;
const corsOptions = {
  origin: "http://localhost:3000", // Adjust as needed
  credentials: true, // Allow credentials (cookies, etc.)
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Auth Routes
app.use(registerRouter);
app.use(loginRouter);
app.use(validateRouter);

app.get("/", (req: Request, res: Response): void => {
  res.send("Hello guys!!");
});

app.listen(PORT, (): void => {
  console.log(`The server is running on PORT: ${PORT}`);
});

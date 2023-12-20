import express from "express";
import dbConnect from "./Config/db-Config.js";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileUpload  from "express-fileupload";
import LibraryRoute from "./Router/Library-Router.js"; // Import the library route
import AdminRoute from "./Router/Admin-Router.js"; // Import the Admin route
import PlansRoute from "./Router/Plans-Router.js"; // Import the Plans route
import BooksRoute from "./Router/Books-Router.js"; // Import the Books route
import userRouter from "./Router/User-Router.js";// Import the User route
import categoryRouter from "./Router/Category-Router.js";// Import the User route
import { varifyToken } from "./Middleware/Varify-token.js";
import { errorHandler } from "./Middleware/Error-handler.js";
import path from "path";
import ErrorResponse from "./utils/Error-Utils.js";
import reserverRouter from "./Router/Reserver-Router.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
    
// Handle MongoDB connection errors
// store.on("error", (error) => {
//  console.log("MongoDB Session Store Error:", error);
// });

// app.use(
//  session({
//    secret: "keyboard cat",  
//    resave: false,
//    saveUninitialized: true,
//    cookie:{secure:false,maxAge: 60000 ,httpOnly: false,},
//    store:store 
//  })  
// );

// app.use(cookieParser());

// app.use(
  //   session({
    //     secret: "your-secret-key",
    //     resave: false, 
    //     saveUninitialized: true,
    //   })
    // );
    
    app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:9999",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }) 
);
 
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.use("/public",express.static(path.join(__dirname,"public")))
// Middleware to console log the request data
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  console.log("Request headers:", req.headers);
  console.log("Request BODY:", req.body);
  console.log("Request data:", req.data);
  console.log("Request Query:", req.query);
  console.log("Request Params:", req.params);
  console.log("Request files:", req.files);
  console.log("Request file:", req.file);
  next();
});

// app.use(fileUpload());

app.use("/admin", AdminRoute); // Use the Admin route
app.use("/library", LibraryRoute); // Use the library route
app.use("/plans", PlansRoute); // Use the Plans route
app.use("/books", BooksRoute); // Use the Books route
app.use("/users", userRouter); // Use the User route
app.use("/reserve", reserverRouter); // Use the reserve route
app.use("/category", categoryRouter); // Use the category route
app.get(`/verify-token`, varifyToken, (req, res) => {
  res.status(200).json({ status: true });
});  
 
dbConnect()   
  .then((res) => console.log(res))
  .catch((err) =>ErrorResponse.internalError(err));

// global error handler
app.use(errorHandler);
// app.use((err,req, res, next) => {
//   console.error(`inside the global error handler ${err}`);

//   res.status(500).json({ error: "Url not found" });
// });

app.listen(port, () => {
  console.log("server running");
  console.log(`https://localhost:${port}`);
});

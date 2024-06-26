import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import usersRouter from "./routes/api/users/createUser.js";
import rolesRouter from "./routes/api/roles/role.js";
import multer from "multer";
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import galleryRouter from "./routes/api/public/photoGallery.js";
import doctorsRouter from "./routes/api/doctors/doctors.js";
import noticeRouter from "./routes/api/public/mainNotice.js";
import bcryptjs from 'bcryptjs';
import cookieParser from 'cookie-parser';
import dutySlotRouter from "./routes/api/public/DutyRoster.js"
import medicineRouters from "./routes/api/medicine/medicnes.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/')
  },
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ storage: storage });

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));


//print uploads folder path


app.use("/api/users", usersRouter);
app.use("/api", noticeRouter);
app.use("/api", medicineRouters);
app.use("/api/roles", rolesRouter);
app.use("/api/public", galleryRouter);
app.use("/api/public/duty",dutySlotRouter);
app.use("/api/doctors", doctorsRouter);



app.listen(process.env.APP_PORT, () => {
  console.log("Server has started on port:", process.env.APP_PORT);
});

// const hashedPassword = await bcryptjs.hash('admin1234', 10);
// console.log(hashedPassword);
// const token = await bcryptjs.hash('pharma@gmail.com', 10);
// console.log(token);
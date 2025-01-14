import express from "express";
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import loginRouter from './routes/login';
import authRouter from './routes/auth';
import messageAuthRouter from './routes/message-auth';
import usersRouter from './routes/users';
import eventsRouter from './routes/events';
import duelsRouter from './routes/duels';
import targetsRouter from './routes/targets'
import initiateRouter from './routes/initiate'
import passport from "passport";

const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser(process.env.COOKIE_KEY));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Velkommen til Hodejeger-API-et!");
});

app.use('/login', loginRouter);
app.use('/auth', authRouter);
app.use('/message-auth', messageAuthRouter)
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/duels', duelsRouter);
app.use('/targets', targetsRouter)
app.use('/initiate', initiateRouter)

app.listen(port, () =>
  console.log(`Server kjører på port ${port}`
));

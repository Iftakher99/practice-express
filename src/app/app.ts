import express, { NextFunction, Request, Response } from 'express';

const app = express();
// const port = 3000;

//parser
app.use(express.json());
app.use(express.text());
//Router

const userRouter = express.Router();
const courseRouter = express.Router();
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);

userRouter.post('/create-user', (req: Request, res: Response) => {
  const user = req.body;
  console.log(user);
  res.json({
    success: true,
    message: 'User Is Created Successfully',
    data: user,
  });
});
//
courseRouter.post('/create-course', (req: Request, res: Response) => {
  const course = req.body;
  console.log(course);
  res.json({
    success: true,
    message: 'Course Is Created Successfully',
    data: course,
  });
});

//create middleware
const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url, req.method, req.hostname);
  next();
};

app.get(
  '/',
  logger,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.send('Hello From Server');
    } catch (error) {
      next(error);
    }
  },
);
app.post('/', logger, (req: Request, res: Response) => {
  console.log(req.body);
  res.json({
    message: 'successfully Received data',
  });
});

//Error handler For routes
app.all('*', (req, res) => {
  res.status(400).json({
    success: false,
    message: 'Route Is Not Found',
  });
});

//global Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    success: false,
    message: 'Something Went Wrong',
  });
});

export default app;

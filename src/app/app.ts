import { ExpressAdapter } from '@hero-js/express-adapter';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

// import { Route } from 'Routes';

const App = express();

App.use(morgan('dev'));
App.use(helmet());
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

const adapter = new ExpressAdapter(App);

// adapter.setRouter(Route);

export default adapter;

import 'Routes';

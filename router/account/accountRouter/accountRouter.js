import express from 'express';
import { dobRouter } from '../dobRouter.js';
import { nameRouter } from '../nameRouter.js';
import { surnameRouter } from '../surnameRouter.js';
import { accountPost } from './accountPost.js';
import { accountGet } from './accountGet.js';
import { accountDelete } from './accountDelete.js';
import { accountPut } from './accountPut.js';

export const accountRouter = express.Router();

accountRouter.use('/', dobRouter);
accountRouter.use('/', nameRouter);
accountRouter.use('/', surnameRouter);

accountRouter.post('/', accountPost)
accountRouter.get('/:name-:surname', accountGet)
accountRouter.delete('/:name-:surname', accountDelete)
accountRouter.put('/:name-:surname', accountPut)
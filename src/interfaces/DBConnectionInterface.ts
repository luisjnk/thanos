import * as mongoose from 'mongoose';
import { ModelsInterface } from './ModelsInterface';

export interface DbConnection extends ModelsInterface{
    mongoose : mongoose
}
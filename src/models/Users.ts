import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
    
})

export default mongoose.model('Users', userSchema)
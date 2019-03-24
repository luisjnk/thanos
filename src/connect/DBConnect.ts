import * as mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/thanos')
mongoose.connection.once('open', () => {
    console.log('connected into database')
})

export default mongoose;
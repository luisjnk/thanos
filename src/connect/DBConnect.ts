import * as mongoose from 'mongoose';
mongoose.connect('mongodb://luisjnk1:lnn4138@ds161551.mlab.com:61551/galactus')
mongoose.connection.once('open', () => {
    console.log('connected into database')
})

export default mongoose;
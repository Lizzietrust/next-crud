import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'next_app',
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isConnected = true;
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

// ohidaelizabeth3
// ARbVALGx9MFJ3faH
// mongodb+srv://ohidaelizabeth3:ARbVALGx9MFJ3faH@cluster0.57gav3f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

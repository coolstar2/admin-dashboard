import postgres from 'postgres'

const connectDB = () =>{
    try{
        postgres.set('strictQuery',false);
        const con = postgres.connect(process.env.POSTGRES_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            // useCreateIndex:true,
            // useFindAndModify:false,
        })
    }
    catch(error){
        console.log(error || `connection error.`)
    }
}

export default connectDB

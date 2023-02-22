const mongoose = require('mongoose');


const dbConection = async() => {

    try {

        mongoose.set("strictQuery", false);
        await mongoose.connect( process.env.MONGODB_CNN );
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }

}


module.exports = {
    dbConection
}
import mongoose from 'mongoose';
// open connection 
let connectionConfig = {
    useCreateIndex:true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}

export function CreateConnection1(connectionString,onConnected)
{
    let callback = (error, con) => {
        if (error!== null) {
            console.log("SOMETHING HAPPENS !!! CONTACT YOUR DEVELOPER")
        }
        else 
        {
            console.log(`YOU ARE NOW CONNECTED to ${connectionString}`);
            if (onConnected !== undefined)
                onConnected(con);
        }
            
    }
    console.log(`inisialisasi connection ${connectionString}`)
    let connection1 = mongoose.createConnection(
        connectionString, 
        connectionConfig, 
        callback
    );
    connection1.on('error',(err)=>console.log(`ERROR ON MONGOOSE CONNECTION ${connectionString}`));
    connection1.on('open', ()=>console.log(`CONNECTED TO MONGODB SERVER ${connectionString}`));
    console.log(`Done`)
    return connection1;
}

export function CreateConnection2(connectionString,onConnected)
{
    let callback = (error, con) => {
        if (error!== null) {
            console.log("SOMETHING HAPPENS !!! CONTACT YOUR DEVELOPER")
        }
        else 
        {
            console.log(`YOU ARE NOW CONNECTED to ${connectionString}`);
            if (onConnected !== undefined)
                onConnected(con);
        }
            
    }
    console.log(`inisialisasi connection ${connectionString}`)
    let db = mongoose.connect(
        connectionString, 
        connectionConfig, 
        callback
    );
    let connection1 = mongoose.connection;
    connection1.on('error',(err)=>console.log(`ERROR ON MONGOOSE CONNECTION ${connectionString}`));
    connection1.on('open', ()=>console.log(`CONNECTED TO MONGODB SERVER ${connectionString}`));
    console.log(`Done`)
    return connection1;
}

export let line = '========================================================================================';
export function drawMessage(message) {
    let teks1 = "| ";
    let teks2 = " |";
    let ctr = teks1.length + teks2.length + message.length;
    let kata = " ".repeat(line.length - ctr);
    let kata1 = `${teks1}${message}${kata}${teks2}`;
    return kata1;
}

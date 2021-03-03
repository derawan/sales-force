import mongoose from 'mongoose';

let errorLogSchema = new mongoose.Schema({
    tipe : mongoose.SchemaTypes.String,
    stackTrace: mongoose.SchemaTypes.String
},{
    timestamps:true
})

let errorLog = mongoose.model('errors', errorLogSchema);

export class BaseRepository {
    constructor(connection) {
        this.Connection = connection;
    }

    async callError(error, callback)
    {
        console.log('hey masalah tuh terjadi kesalaha dalam sistem anda');
        await errorLog.create({
            tipe: "ERROR",
            stackTrace:JSON.stringify(error)
        });
        // if (error instanceof mongoose.Error.ValidationError) 
        // {
        //     callback('VALIDATION_ERROR',error)
        // }
        // else
        // {
        //     callback('SYSTEM_ERROR',error)
        // } 
    }


    async TambahData(dataBaru, callBack){
        try 
        {
            return await this.Tambahkan(dataBaru)
        }
        catch(error) {
            await this.callError(error, callBack) ;
                
        }
    }

    async UbahData(id, dataBaru, callback){
        try 
        {
            return await this.Perbaharui(id,dataBaru)
        }
        catch(error) {
            await this.callError(error, callback) ;
                
        }
    }

    async Hapusdata(id, callBack) {
        try 
        {
            return await this.Hapus(id)
        }
        catch(error) {
            await this.callError(error, callBack) ;
                
        }
    }


    async AmbilData(criteria, callBack) {
        try 
        {
            return await this.Query(criteria)
        }
        catch(error) {
            await this.callError(error, callBack) ;
                
        }
    }

    async AmbilDataDetail(criteria, callBack) {
        try 
        {
            return await this.CariDetail(criteria)
        }
        catch(error) {
            await this.callError(error, callBack) ;
                
        }
    }


}
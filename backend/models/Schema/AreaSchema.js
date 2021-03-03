import mongoose, {Schema, SchemaTypes} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator';


export const AreaSchema = new Schema({
    nama_area : {type:String, required:[true,'Nama Area wajib diisi'], unique:true}
},{
    timestamps : true
})

AreaSchema.plugin(uniqueValidator);





export const Area = mongoose.model('area', AreaSchema);

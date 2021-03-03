import mongoose, {Schema} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator';



export const UserGroupSchema = new Schema({
    group_pengguna : {type:String, required:[true,'Nama Group wajib diisi'], unique:true}
},{
    timestamps : true
});

UserGroupSchema.plugin(uniqueValidator);








export const UserGroup = mongoose.model('user_group', UserGroupSchema);
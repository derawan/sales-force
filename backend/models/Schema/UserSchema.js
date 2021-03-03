import {Schema, SchemaTypes} from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator';


export const UserSchema = new Schema({
    nik: {
        type:SchemaTypes.String, 
        unique:true, 
        required:[true, 'nik wajib diisi'] 
    },
    nama: {
        type:SchemaTypes.String, 
        required:[true,'nama user harus diisi']
    },
    email: { 
        type:SchemaTypes.String, 
        required:[true,'email wajib diisi']
    },
    foto: {
        type:SchemaTypes.String,
        validate:{
            validator:function(value){
                return true
            },
            message: props => `${props.value} file harus sudah ada di server dan berupa image (jpg|jpeg|gif|png|mp4)` 
        }
    },
    password: {
        type:SchemaTypes.String, 
        required:[true,'password wajib diisi']
    },

    user_group: {
        type:SchemaTypes.ObjectId, 
        ref:'user_group'
    },

    report_ke:  {
        type:SchemaTypes.ObjectId, 
        ref:'user'
    },

    bawahan:[
        {type:SchemaTypes.ObjectId, ref:'user'}
    ],

    area: {type:SchemaTypes.ObjectId, ref:'area'}

},{
    timestamps:true
});

UserSchema.plugin(uniqueValidator);






export const User = mongoose.model('user', UserSchema);
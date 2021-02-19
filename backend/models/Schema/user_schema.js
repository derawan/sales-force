import mongoose, {Schema} from 'mongoose';

export const userSchema = new Schema({
    firstname : {
        type: String, 
        required: true, 
        minLength:[3, 'Nama harus minimal 3 huruf']
    },
    lastname : String,
    username : { 
        type: String, 
        required:true, 
        minLength:[5, 'Nama harus minimal 5 huruf'],
        maxLength:[10, 'Username panjangnya maksimum 10 huruf']
    },
    password : {
        type: String,
        required: true
    },
    phone : String,
    status: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

userSchema.virtual('fullname')
    .get(function() {
        return `${this.firstname} ${this.lastname}`
    })
    .set(function(value){
        // this.firstname = value.split(' ')[0];
        // this.lastname  = value.split(' ')[1];

        [this.firstname, this.lastname] = value.split(' ');
    });

let connection = mongoose.connection;
export const userModel = connection.model('user', userSchema);


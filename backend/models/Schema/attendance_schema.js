import mongoose, {Schema} from 'mongoose';

export const attendanceSchema = new Schema({
    AbsenIn : Date,
    AbsenOut: Date,
    UserId  : {
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    IsApproved: Boolean,
    ApprovalNotes: [String],
    Longitude:String,
    Latitude: String,
    Photo:[String]

}, {
    timestamps: true
});


let connection = mongoose.connection;
export const attendanceModel = connection.model('attendance', attendanceSchema);


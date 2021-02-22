import Express from 'express';
import * as Utilities from './../core/utilities/utils'
import * as user from './../models/Schema/user_schema';
import * as attendances from './../models/Schema/attendance_schema';
import mongoose from 'mongoose';

const defaultRouter = Express.Router();

defaultRouter.route("/").get(async (req, res) => { 
    //res.json({success:true,message:"welcome"})}
    res.render(Utilities.GetView('index')); }
);
defaultRouter.route("/about").get(async (req, res) => { 
    res.render(Utilities.GetView('about')); 
});
defaultRouter.route("/contact").get(async (req, res) => { 
    res.render(Utilities.GetView('contact')); 
});
defaultRouter.route("/hello").get(async (req, res) => { 
    res.render(Utilities.GetView('hello')); 
});


defaultRouter.route("/approval").post(async (req, res) => { 
    // masukkan attendanceid
    let attendance_id = req.body.attendance_id;

    // validasi
    if (attendance_id===undefined) {
        return res.status(403).json({success:false, message:'data attendance tidak ditemukan'})
    }

    //console.log();
    try {
        let dataAttendance = await attendances.attendanceModel.findById(mongoose.Types.ObjectId(attendance_id)).exec();
        if (!dataAttendance) {
            return res.status(403).json({success:false, message:'data attendance tidak ditemukan'})    
        }

        // dataAttendance ditemukan
        if (dataAttendance.IsApproved) {
            return res.status(403).json({success:false, message:'data attendance sudah pernah disetujui'});
        }
        else {
            dataAttendance.IsApproved = true;
            dataAttendance.save();
            return res.status(200).json({success:true, message:'data attendance sudah berhasil disetujui'})    
        }
    }
    catch (error) {
        return res.status(403).json({success:false, message:'data attendance tidak ditemukan'})
    }
    


});


defaultRouter.route("/logout").post(async (req, res) => { 
    // masukkan attendanceid
    let attendance_id = req.body.attendance_id;

    // validasi
    if (attendance_id===undefined) {
        return res.status(403).json({success:false, message:'data attendance tidak ditemukan'})
    }

    //console.log();
    try {
        let dataAttendance = await attendances.attendanceModel.findById(mongoose.Types.ObjectId(attendance_id)).exec();
        if (!dataAttendance) {
            return res.status(403).json({success:false, message:'data attendance tidak ditemukan'})    
        }
        if (dataAttendance.IsApproved) {
            dataAttendance.AbsenOut = Date.now();
            dataAttendance.save();
            return res.status(200).json({success:true, message:'anda berhasil logout'});
        }
        else {
            return res.status(403).json({success:false, message:'silahkan kontak supervisor anda, untuk mengapprove absen pulang'})    
        }
    }
    catch (error) {
        return res.status(403).json({success:false, message:'data attendance tidak ditemukan'})
    }
    

    

});

defaultRouter.route("/login").post(async (req, res) => { 
    // masukkan username, password
    let username = req.body.username;
    let password = req.body.password;
    let longitude = req.body.longitude;
    let latitude  = req.body.latitude;
    console.log(username, password)

    // validasi
    if (username===undefined) {
        return res.status(403).json({success:false, message:'username wajib diisi'})
    }

    if (password===undefined) {
        return res.status(403).json({success:false, message:'password wajib diisi'})
    }

    let datauser = await user.userModel.findOne({username:username}).exec();
    if (!datauser) {
        return res.status(404).json({success:false, message:'user tidak terdaftar'});
    }
    if (datauser.password !== password) {
        return res.status(403).json({success:false, message:'password tidak valid'});
        
    }



    // save attendance
    let attendanceData = {
        AbsenIn : Date.now(),
        AbsenOut:null,
        UserId  : datauser._id,
        IsApproved: false,
        ApprovalNotes: [],
        Latitude: latitude,
        Longitude : longitude,
        Photo :[]
    }
    let absensi = await attendances.attendanceModel.create(attendanceData);

    // generate token
    let token = Date.now().toString();
    let payloadData = {
        token,
        userId:datauser._id,
        attendanceId:absensi._id
    }


    // kirim token
    return res.status(200).json({success:true, message:'selamat anda berhasil login', payload:payloadData});
});


const rt = {
    group:'/',
    route:defaultRouter
}

//export default defaultRouter;
export default rt;
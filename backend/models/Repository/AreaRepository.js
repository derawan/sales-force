import {BaseRepository} from './BaseRepository'
import {Area} from './../Schema/AreaSchema';
import mongoose from 'mongoose';


export class AreaRepository extends BaseRepository {

    async Tambahkan(dataBaru){
        let areaBaru = await Area.create(dataBaru);
        return areaBaru;
    }

    async Perbaharui(id, dataBaru){
        let areaBaru = await Area.findById(mongoose.Types.ObjectId(id));
        for(let a in dataBaru) {
            areaBaru[a] = dataBaru[a];
        }
        areaBaru.save();
        return areaBaru;
    }


    async Hapus(id){
        let areaBaru = await Area.findById(mongoose.Types.ObjectId(id));
        areaBaru.delete();
        return areaBaru;
    }

    async CariDetail(criteria) {
        let daftar = await Area.findOne(criteria).exec();
        return daftar;
    }

}
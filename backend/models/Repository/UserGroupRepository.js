import {BaseRepository} from './BaseRepository'
import {UserGroup} from './../Schema/UserGroupSchema';
import mongoose from 'mongoose';


export class UserGroupRepository extends BaseRepository {

    async Tambahkan(dataBaru){
        let usergroupBaru = await UserGroup.create(dataBaru);
        return usergroupBaru;
    }

    async Perbaharui(id, dataBaru){
        let usergroupBaru = await UserGroup.findById(mongoose.Types.ObjectId(id));
        for(let a in dataBaru) {
            usergroupBaru[a] = dataBaru[a];
        }
        usergroupBaru.save();
        return usergroupBaru;
    }


    async Hapus(id){
        let usergroupBaru = await UserGroup.findById(mongoose.Types.ObjectId(id));
        usergroupBaru.delete();
        return usergroupBaru;
    }

    async CariDetail(criteria) {
        let daftar = await UserGroup.findOne(criteria).exec();
        return daftar;
    }

}
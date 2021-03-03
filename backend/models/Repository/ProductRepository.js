import {BaseRepository} from './BaseRepository'
import {Product} from '../Schema/ProductSchema';
import mongoose from 'mongoose';


export class ProductRepository extends BaseRepository {

    async Tambahkan(dataBaru){
        let usergroupBaru = await Product.create(dataBaru);
        return usergroupBaru;
    }

    async Perbaharui(id, dataBaru){
        let usergroupBaru = await Product.findById(mongoose.Types.ObjectId(id));
        for(let a in dataBaru) {
            usergroupBaru[a] = dataBaru[a];
        }
        usergroupBaru.save();
        return usergroupBaru;
    }


    async Hapus(id){
        let usergroupBaru = await Product.findById(mongoose.Types.ObjectId(id));
        usergroupBaru.delete();
        return usergroupBaru;
    }

    async CariDetail(criteria) {
        let daftar = await Product.findOne(criteria).exec();
        return daftar;
    }

}
import fs from 'fs';
//import defaultRouter from './main_route';

let mods = [];
fs.readdirSync(__dirname).filter(item => item!=='index.js').forEach(item =>{
    mods.push({name:item, module: require(`${__dirname}/${item}`) });
});

const route = [];

mods.forEach(item => {
    route.push(item.module.default)
})

export default route;
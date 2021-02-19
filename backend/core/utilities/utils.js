// ambil data konfigurasi bila tidak ada ambil nilai default
export function GetConfig(configName, defaultValue) {
    let config = process.env[configName];
    return (config===undefined)?defaultValue:config;
}


export function GetView(viewName) {
    return `./${"pages/"}${viewName}`
}
function log(req, res,next){
    console.log('Log yozish...');
    next();
}
function authentifikatsiya(req, res,next){
    console.log('Autentifikatsiya qilish...');
    next();
}

module.exports.log=log;
module.exports.authentifikatsiya=authentifikatsiya;
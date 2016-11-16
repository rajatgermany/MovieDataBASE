/*


DataBase Configuration for different Envoirments


 */
var config = {}
config.Db = function(){
    if(process.env.NODE_ENV == 'test'){
        console.log('Test')
        return "mongodb://localhost/movies2"
    }
    else {
        console.log('Development')
        return "mongodb://localhost/movies1"
    }
}






module.exports = config;
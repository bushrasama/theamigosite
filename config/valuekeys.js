// module.exports ={
//     MONGOURI :"mongodb+srv://bushra:bumongodb@cluster0.2wk1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// }

if(process.env.NODE_ENV=='production'){
    module.exports = require('./prod')
}else{
    module.exports = require('./dev')
}
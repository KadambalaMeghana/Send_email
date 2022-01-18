const { JWT_SECRET } = require('./prod')

if(process.env.NODE_ENV==='production'){
    module.exports = require('./prod')
}
else{
    module.exports=require('./dev')
}
// module.exports={
//     MONGOURI:"mongodb+srv://meghana:A3qSo6RKPtbGhgjq@cluster0.gccmj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
//     JWT_SECRET:"gmeghadhipallspa151428"

// }
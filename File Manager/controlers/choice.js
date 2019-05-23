const uuid = require('uuid/v4');
const servers = require('../module/getServers');
const db = require('../module/conn')
const request = require('request');
const fetch = require('node-fetch');


function f(servers, res ,cb,obj) {

    var promises = servers.map(url => fetch(getUrl(url)).then(y => y.text()));
    Promise.all(promises).then(results => {
        // do something with results.
        let small = Number.MAX_SAFE_INTEGER;
        let gool = -1;
        results = results.map(i=>parseInt(i))
        for(var i = 0;i<results.length;i++){
            if(results[i]<small){
                small = results[i];
                gool = i;
            }
        }
        cb(gool,res,obj)
    });

}

function getUrl(host) {
    return `http://${host.name}/api/size`;
}




function n(gool,res,obj){
    let uu = uuid();
    obj.uuid = uu;
    obj.server = gool;
    obj.urlDownload = `http://localhost:808${gool}/api/file/${uu}`;
 //   console.log(obj.size+","+obj.uid+",'"+obj.uuid+"',"+ obj.server+",'"+obj.name+"','"+obj.urlDownload);
    let sql = "INSERT INTO information(size, uid, uuid, server, name,urlDownload ,parent,isFolder) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sql,[obj.size,obj.uid,obj.uuid,obj.server,obj.name,obj.urlDownload,obj.parent,obj.isfolder],(err,res)=>{ if(err){console.log(err)}})
    if(gool==0){
        res.send(`"http://localhost:808${gool}/api/s1/${uu}"`);
    }else if (gool==1){
        res.send(`"http://localhost:808${gool}/api/s2/${uu}"`);
    }else if (gool==2){
        res.send(`"http://localhost:808${gool}/api/s3/${uu}"`);
    }



}

module.exports = {
    post:(req, res) => {
    let obj = {
        size : req.params.size,
        uid  : req.params.uid.toString(),
        name : req.params.name,
        isfolder  :req.params.isfolder,
        parent : req.params.parent
    };
    let sql = `select name from servers`;
    db.query(sql, (err, result) => {
        if (err)
            console.log(err.message)
        else {
            let servers = Object.values(JSON.parse(JSON.stringify(result)));
            f(servers,res, n,obj);
        }
    })
    },
    info:(req,res)=>{
        let sql = `SELECT id,uuid ,name,urlDownload,parent,isFolder FROM information WHERE uid = ?`
        db.query(sql,req.params.uid,(err,result)=>{
            if(err)throw err;
            res.json({
                info:result
            });
        });
    },
    download:(req,res)=>{
        let sql = `SELECT server FROM information WHERE uuid = ?`;
        db.query(sql,req.params.fid,(err,result)=>{
            if(err)throw err;
            let server = JSON.parse(JSON.stringify(result))[0].server;
            fetch(`http://localhost:808${server}/api/url/${req.params.fid}`).then(y =>{
                res.json({
                    info :y.text()
                });     
            })
        }) 
    },
    addfolder: (req,res)=>{
        let sql = "INSERT INTO information(size, uid, uuid, server, name,urlDownload ,parent,isFolder)" +
            " VALUES (?,?,?,?,?,?,?,?)";
        db.query(sql,[-1,req.params.uid,'',-1,req.params.name,'',req.params.parent,1],(err,resp)=>{
            if(err){
                res.json({success:"false"})
            }
            res.json({success:"true",name:req.params.name,parent:req.params.parent})
        })


    }
};
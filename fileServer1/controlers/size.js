const getSize = require('../helpjs/filemanage');
const path = require('path');
var IncomingForm = require('formidable').IncomingForm;
var fs = require('fs');
const db = require('../module/conn');
const request =  require('request')




module.exports = {

    get: (req, res) => {
        res.send(getSize(path.join(__dirname, '..', path.sep, 'upload', path.sep)).toString());
    },
    postFile: async (req, res) => {
        // Then in your request handler
        var form = new IncomingForm()
        form.uploadDir = './upload';
        form.keepExtensions = true;

        form.parse(req, async function (err, fields, files) {
            if (err) {

                res.json({stauts:false,message:err.message})

            } else if (!files.file) {
                res.send({ msg: 'no file received' })
            } else {

                var file = files.file;
                var timeName = Date.now() + file.name;
                fs.rename(file.path, path.join('upload', timeName), function (err) {
                    if (err)    res.json({stauts:false,message:err.message})
                });

                let f = {
                    id: req.params.id,
                    name: timeName,
                    ORIGINAl: file.name
                }
                let sql = 'insert into files set ?';
                let query = db.query(sql, f, (err, result) => {
                    if (err)    res.json({stauts:false,message:err.message})
                })


                let id='';
                let pathFole = '';
                id = f.id;
                pathFole = path.join('upload', timeName);
                console.log()
                const options = {
                    method: "POST",
                    url: "http://localhost:8090/api/s1/"+id,
                    port: 443,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    formData : {
                        "file" : fs.createReadStream('upload/'+timeName)
                    }
                };
                console.log('../upload/'+timeName);
                await request(options, function (err, res, body) {

                    if(err) {
                        console.log(err.message);
                    }
                    //resp.send({msg:'done'})
                    console.log(body);
                });


                res.send({ msg: `done file id ${req.params.id} recevid with name ${file.name}` });

            }
        }) 

    },
    fileid: (req, res) => {
       // console.log(req)
       var arr;
        let sql = 'SELECT NAME FROM files WHERE id = ?'; 
        let query = db.query(sql, req.params.id, (err, result) => {
            if (err) res.json({stauts:false,message:err.message})
            console.log('sssssssssssss1111111111111111')

            arr = Object.values(JSON.parse(JSON.stringify(result)));

            if(arr.length === 0)
            {   res.json({
                msg : 'file not found ..'
                })
            }
            else
                res.download(path.join(__dirname,'..',path.sep,'upload',arr[0].NAME).toString());
        })


    },
    fileurl :(req,res)=> {
        // console.log(req)
        var arr;
         let sql = 'SELECT NAME FROM files WHERE id = ?';
         let query = db.query(sql, req.params.id, (err, result) => {
             if (err) {
                 res.json({stauts:false,message:err.message})
             };
             arr = Object.values(JSON.parse(JSON.stringify(result)));
            // res.send(path.join(__dirname,'..',path.sep,'upload',arr[0].NAME).toString());  
            res.send(`http://localhost:8080/api/file/${req.params.id}`);
        })
    }

}
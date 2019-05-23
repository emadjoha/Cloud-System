const getSize = require('../helpjs/filemanage');
const path = require('path');
var IncomingForm = require('formidable').IncomingForm;
var fs = require('fs');
const db = require('../module/conn');

module.exports = {

    get: (req, res) => {
        res.send(getSize(path.join(__dirname, '..', path.sep, 'upload', path.sep)).toString());
    },
    postFile: (req, res) => {
        // Then in your request handler
        var form = new IncomingForm()
        form.uploadDir = './upload';
        form.keepExtensions = true;

        form.parse(req, function (err, fields, files) {
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

            console.log()

                let f = {
                    id: req.params.id,
                    name: timeName,
                    ORIGINAl: file.name
                }
                let sql = 'insert into files set ?';
                let query = db.query(sql, f, (err, result) => {
                    if (err)    res.json({stauts:false,message:err.message})
                })


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
            res.send(`http://localhost:8091/api/file/${req.params.id}`);
        })
    }

}
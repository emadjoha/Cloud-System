const fs = require('fs');
const path = require('path');


function scaner(y,counter = 0){
    counter += 0;
    let y1 = fs.readdirSync(y);
    for(let x of y1){
        let stat = fs.statSync(y + x);
        if(!stat.isFile()){
            let path = y + x + '/';
            counter += scaner(path,counter);
        }{
          counter += stat.size;
        }
    }
    return counter;
}

module.exports  =  scaner;

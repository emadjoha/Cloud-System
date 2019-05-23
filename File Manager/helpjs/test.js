const fetch = require('node-fetch');


// async function fetchAvatatUrl() {
//     try {
//         let response = await fetch('https://catappapi.herokuapp.com/users/123');
//         const data = await response.json();
//         return data.imageUrl;
//     } catch (err) {
//         console.log(err)
//     }
// }

// async function f() {

//     console.log('url is :' + await fetchAvatatUrl())

// }




// function fetchWithPromiss() {
//     fetch('https://catappapi.herokuapp.com/users/123')
//         .then(res => res.json())
//         .then(res => console.log('url is :' + res.imageUrl))
// }

// // fetchWithPromiss()

// // f()



function fetchWithPromiss1() {
    return fetch('https://catappapi.herokuapp.com/users/123')
        .then(res => res.json())
        .then(res => {
            let Promises = res.cats.map(catId =>
                fetch(`https://catappapi.herokuapp.com/cats/${catId}`)
                    .then(response => response.json())
                    .then(catData => catData.imageUrl)
            )
            return Promise.all(Promises);
        })
        .catch(err => console.log(err.message))
}

async function f1() {
    let res = await fetchWithPromiss1()
    console.log(res)

}

//f1()


async function awaitf() {
    let res = await fetch('https://catappapi.herokuapp.com/users/123');
    let data = await res.json();
    let cats = await data.cats;
    let arr = []
    for(let i = 0; i< cats.length ;i++){
        let response = await fetch('https://catappapi.herokuapp.com/cats/' + cats[i]);
        let catData =  await response.json();
        arr.push(catData.imageUrl)
    }
    console.log(arr)
}


//awaitf()


async function awaitf2() {
    let res = await fetch('https://catappapi.herokuapp.com/users/123');
    let data = await res.json();
    let cats = data.cats;

    return await Promise.all(cats.map(async catId => {
        let response = await fetch('https://catappapi.herokuapp.com/cats/' + catId);
        let catData =  await response.json();
        return catData.imageUrl;

    }))
    

}



async function aw() {
    let res = await awaitf2()
    console.log(res)

}

//aw()

async function fun(){
  return 1
}

console.log(fun())















































































// const request = require('request');

// var requestAsync = function(url) {
//     return new Promise((resolve, reject) => {
//         var req = request(url, (err, response, body) => {
//             if (err) return reject(err, response, body);
//             resolve(JSON.parse(body));
//         });
//     });
// };

// const urls = [
//     'https://localhost:8080/api/size',
//     'https://localhost:8081/api/size'
// ];

// /* Works as of Node 7.6 */
// var getParallel = async function() {
//     //transform requests into Promises, await all
//     try {
//         var data = await Promise.all(urls.map(requestAsync));
//     } catch (err) {
//         console.error(err);
//     }
//     console.log(data);
// }

// getParallel();

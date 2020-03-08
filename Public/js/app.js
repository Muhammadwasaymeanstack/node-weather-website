console.log('client side jave script is loaded')

// // app.use((req,res,next)=>{
// // res.header('Access-Control-Allow-Origin','*')
// // res.header(
// //     'Access-Control-Allow-Headers',
// //     'Original, X-Requested-with, Content-Type, Accept, Authorization'
// // )
// // if (req.method === 'OPTIONS'){
// //     res.header('Access-Control_Allow-Methods','PUT,POST,PATHC,DELETE')
// //     return res.status(200).json({})
// // }
// // })

// fetch('http://puzzle.mead.io//puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#msg-1')
const messageTwo = document.querySelector('#msg-2')
// messageOne.textContent = 'From JS'


weatherForm.addEventListener('submit',(e)=>{
    
    e.preventDefault() 

    const location = search.value 

    messageOne.textContent = 'Loading...'
    messageTwo.textContent= ''
    fetch('localhost:3000/weather?address=' + location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
        messageOne.textContent = data.error
        }
        else{
           messageOne.textContent = data.location
            messageOne.textContent= data.forecast
        }
    })
})
})
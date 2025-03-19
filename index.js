let container=document.createElement("div")
container.className="container"
let url="https://boundless-rune-panda.glitch.me/Products"
let idinput=document.getElementById("id")
let titleinput=document.getElementById("title")
let priceinput=document.getElementById("price")
let descriptioninput=document.getElementById("description")
let btn=document.getElementById("btn")
btn.addEventListener("click", async function()
{
   // here we have to check whether the id is empty or not, if empty we cann data if not we can just modify the existing data
   if(titleinput.value==""||priceinput.value==""||descriptioninput.value=="")
   {
    alert("fill the data")
   }
   else
   {
    //lets check whether id is empty or not
    let method=idinput.value ? "PUT":"POST"
     // idinput=0 or empty it is false so POST if there is id input value then it is true so put
     // now here even url is also to be checked for PUT we need "id" for POST no need of "id"
     let mainURL=(method=="PUT") ? `${url}/${idinput.value}` : url
     console.log(mainURL)
   let response=  await fetch(mainURL,{
         //"method"="method" here both are same we can use once
         method,
         "headers":
         {
            "Content-Type":"application/json"
         },
         "body":JSON.stringify(
            {
                "title":titleinput.value,
                "price":priceinput.value,
                "description":descriptioninput.value
            }
         )
     })
     if(response.ok)
     {
        getData()
        alert((method=="PUT")? "Data Updated":"Data added")
     }

   }
})

async function getData()
{
    try
    {
        let response =await fetch(url) //create a response variable and use await to fetch that url it returns promise object
        if(response.ok)
        {
            let data=await response.json(); 
            displayData(data)
        }

    }
    catch(err)
    {
        console.error(err)
    }

 }
function displayData(products)
{
    container.innerHTML=``
    for(let obj of products)
    {
        let item=document.createElement("div")
        item.className="item"
        
        item.innerHTML=`
        <img class="image"src="${obj.image}">
        <p class="title">${obj.title} -<span  class="price">${obj.price}</span>
        
        <p class="description">${obj.description}</p>
        <button class="Delete" onclick=deleteData('${obj.id}')>Delete</button>
         <button class="Update" onclick=updateData('${obj.id}')>Update</button>
         

        `
        container.appendChild(item)
    }
    document.body.appendChild(container)
}
async function updateData(id)
{
     try
     {
        //first lets get the data and then send to the input tags
        let response = await fetch(`${url}/${id}`)
     let obj=await response.json()
     titleinput.value=obj.title // sharing the data 
     priceinput.value=obj.price
     descriptioninput.value=obj.description
     idinput.value=obj.id
     // here update is workings but till we go and at the input tags we dont know whether it had updated or not so for that we use scroll
     //window.scroll(0,0) //x-axis-0, y-axis-0 so it goes to up
     window.scroll(
        {
            top:0,
            behavior:"smooth"
            
        }
     )


     
     }
     catch(err)
     {
        console.error(err)
     }
}
 async function deleteData(id)
    {
        try
    
        {
            let response=await fetch(`${url}/${id}`,{"method":"DELETE"})
            if (response.ok)
            {
                getData()
                alert("Data Deleted")
            }
        }
    
    catch(err)
    {
        console.error(err)
    }
    }


getData();
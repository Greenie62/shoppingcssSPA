document.body.style.background='lemonchiffon'

//handle the links-list toggle
//DOM variables
var burgerBtn=document.querySelector(".burger");
var links=document.querySelectorAll(".nav-item");
var content=document.querySelector(".content-container")
var shoppingcart=document.querySelector(".shopping-cart")
var boughitemslist=document.querySelector(".boughtitemslist")
var totalDOM=document.getElementById("total")
var boughtitemsarray=[];
var siteLogo=document.querySelector(".nav-content h4");
var totalCost=0;
var quantity=0;

burgerBtn.addEventListener("click",showLinks)
siteLogo.addEventListener("click",showCart)

function showCart(){
    shoppingcart.style.opacity=1
    setTimeout(()=>{
        shoppingcart.style.opacity=0
    },2500)
}

function showLinks(){
    console.log('show links fired')
    links.forEach(l=>{
        if(l.className === "nav-item"){
            l.className="show-link"
        }
        else if(l.className === "show-link"){
            l.className="nav-item"
        }
        console.log(l)
    })
}

function rendercartitems(array){
    var html=array.map(i=>(
        `<li class='list-item'>${i}    Quantity:<span class='quantity'>${quantity}</li>`
    ))
    array.length !== 0 ? boughtitemslist.innerHTML=html : boughtitemslist.innerHTML="No Items Purchased", totalDOM.innerHTML="$" + totalCost
}


document.addEventListener("DOMContentLoaded",()=>{
    console.log("DOM is loaded")
    fetch('./items.json')
    .then(data=>data.json())
    .then(json=>{
        console.log(json)
        var html=json.map(j=>(
            `<div class='product-container'>
              <img src=${j.image} alt="image">
              <span class='info-tag'>
              <p>Name:${j.name}</p>
              <p>Price:$${j.price}</p>
              <p>Quantity:${j.quantity}</p>
              <button data-name='${j.name}' data-price='${j.price}' data-quantity='${j.quantity}' class='buybtn'>Buy</button>
              </span>
            </div>`
        ))
        content.innerHTML=html

  
rendercartitems(boughtitemsarray)

        var buyBtns=document.querySelectorAll(".buybtn")

        buyBtns.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                if(boughtitemsarray.indexOf(e.target.attributes.getNamedItem("data-name").value) === -1){
                boughtitemsarray.push(e.target.attributes.getNamedItem("data-name").value)
                }
                else{
                    console.log("thats an item you already got");
                    var htmlitemcollection=boughtitemslist.querySelectorAll("li");
                   // console.log(htmlitemcollection)
                    var itemarray=Array.from(htmlitemcollection);
                    var itemnames=[];
                    itemarray.map(i=>{
                           itemnames.push(i.innerText)
                    })
                    console.log(itemnames)
                    var findIndex=e.target.attributes.getNamedItem("data-name").value + " Quantity:1";
                    console.log(itemnames.indexOf(findIndex))
                }
                totalCost+=parseInt(e.target.attributes.getNamedItem("data-price").value)
                console.log(e.target.attributes.getNamedItem("data-quantity").value)
                console.log(boughtitemsarray)
                rendercartitems(boughtitemsarray)
                shoppingcart.style.opacity=1
                setTimeout(()=>{
                    shoppingcart.style.opacity=0
                },2500)
            })
        })

        
    })
})


document.body.style.background='lemonchiffon'

//handle the links-list toggle
//DOM variables
var burgerBtn=document.querySelector(".burger");
var links=document.querySelectorAll(".nav-item");
var content=document.querySelector(".content-container")
var shoppingcart=document.querySelector(".shopping-cart")

burgerBtn.addEventListener("click",showLinks)

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


        var buyBtns=document.querySelectorAll(".buybtn")

        buyBtns.forEach(btn=>{
            btn.addEventListener("click",(e)=>{
                console.log(e.target.attributes.getNamedItem("data-quantity").value)
                shoppingcart.style.opacity=1
                setTimeout(()=>{
                    shoppingcart.style.opacity=0
                },2500)
            })
        })

        
    })
})


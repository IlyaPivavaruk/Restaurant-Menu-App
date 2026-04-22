import {menuArray} from './data.js'

const menuItemsSec = document.getElementById('menu-items-section')
menuItemsSec.addEventListener('click', HandleMenuItemsClick)

const payItemLines = document.getElementById('pay-item-lines')
payItemLines.addEventListener('click', HandleRemoveFromCart)

const confirmButton = document.getElementById('confirm-btn')
confirmButton.addEventListener('click', HandleConfirmButtonClick)

const paySection = document.getElementById('pay-section')
const menuItems = []
const cartItems = []

const cardPopUpOverlay = document.getElementById('card-pop-up-overlay')
const cardPopUp = document.getElementById('card-pop-up')
cardPopUp.addEventListener('submit', HandlePayButtonClick)

//const payButton = document.getElementById('card-pop-up-pay-btn')
//payButton.addEventListener('click', HandlePayButtonClick)

const confirmMessage = document.getElementById('confirm-message')



class MenuItem{
    constructor(id, name, price){
        this.id = id
        this.name = name
        this.price = price
    }

}
// Called when the user clicks on the items
function HandleMenuItemsClick(event){
    
    if(event.target.dataset.btnId){
        const btnId = event.target.dataset.btnId
        console.log(btnId)
        cartItems.push(menuItems.filter(item => parseInt(item.id) === parseInt(btnId))[0])

        confirmMessage.replaceChildren()

        RenderCartItems()
    }
    
    
}
// Called when the complete order button is pressed
function HandleConfirmButtonClick(){
    cardPopUpOverlay.classList.toggle('hide')
    cardPopUp.classList.toggle('hide')

}

function HandlePayButtonClick(event){
    event.preventDefault()

    const playerName = document.getElementById('card-pop-up-name')
    const cardNum = document.getElementById('card-pop-up-card')
    const ccvNum = document.getElementById('card-pop-up-ccv')

    const newChild = document.createElement('h1')
    newChild.textContent = `Thanks, ${playerName.value}! Your order is on its way!`
    confirmMessage.appendChild(newChild)
    cardPopUp.classList.toggle('hide')
    cardPopUpOverlay.classList.toggle('hide')
    cartItems.length = 0
    cardPopUp.reset()

    RenderCartItems()
}

function RenderCartItems(){


    let totalPrice = 0
    const cartItemsHtml = cartItems.map((item,index) => {
        totalPrice += item.price
        return `
        <li class="pay-item-line">
            <div class="pay-item-line-left">
                <p class="pay-item-line-name">${item.name}</p>
                <button class="pay-item-remove-btn" data-remove-btn-index="${index}">remove</button>
            </div>
            <p class="pay-item-line-price">$${item.price}</p>
        </li>
        `

    })
    cartItemsHtml.push(
        `
        <li class="pay-item-line total">
            <p class="pay-item-line-name">Total Price:</p>
            <p class="pay-item-line-price">$${totalPrice}</p>
        </li>
        `
    )

    payItemLines.innerHTML = cartItemsHtml.join('')

    if(cartItems.length > 0){
        if(paySection.classList.contains('hide')){
            paySection.classList.toggle('hide')
        }
        
    }else{ //if 0
        if(!paySection.classList.contains('hide')){
            paySection.classList.toggle('hide')
        }
        
    }
    
}

function HandleRemoveFromCart(event){
    if(event.target.dataset.removeBtnIndex){
        cartItems.splice(event.target.dataset.removeBtnIndex, 1)
        RenderCartItems()
    }
}


function PopulateMenuItems(itemArr){
    
    const itemHtmlArr = itemArr.map(item =>{

        //populate the map of menu items
        menuItems.push(new MenuItem(item.id, item.name, item.price))

        return `
        <div class="menu-item">
            <div class="menu-item-description">
                <div class="menu-item-description-emoji">${item.emoji}</div>
                <div class="menu-item-description-text">
                    <h1 class="menu-item-name">${item.name}</h1>
                    <p class="menu-item-ingredients">${[...item.ingredients].join(', ')}</p>
                    <h2 class="menu-item-price">${'$'+item.price}</h2>
                </div>
            </div>
            <button class="menu-item-button" data-btn-id="${item.id}">+</button>
        </div>
        `
    }).join('')
    
    menuItemsSec.innerHTML = itemHtmlArr
}




PopulateMenuItems(menuArray)
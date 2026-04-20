import {menuArray} from './data.js'

const menuItemsSec = document.getElementById('menu-items-section')

function PopulateMenuItems(itemArr){
    
    const itemHtmlArr = itemArr.map(item =>{
        return `
        <div class="menu-item">
            <div class="menu-item-description">
                <img class="menu-item-description-img" src="./images/pizza.png">
                <div class="menu-item-description-text">
                    <h1 class="menu-item-name">${item.name}</h1>
                    <p class="menu-item-ingredients">${[...item.ingredients].join(', ')}</p>
                    <h2 class="menu-item-price">${'$'+item.price}</h2>
                </div>
            </div>
            <button class="menu-item-button">+</button>
        </div>
        `
    }).join('')
    
    menuItemsSec.innerHTML = itemHtmlArr
}




PopulateMenuItems(menuArray)
const search = document.querySelector('.search__input')
const dropdown = document.querySelector('.dropdown')
const box = document.querySelector('.box')

const app = {
    listItem: {},
    data: [
        {country: "Viet Nam", flag: "images/vietnam.gif"},
        {country: "USA", flag: "images/usa.png"},
        {country: "Korea", flag: "images/korea.gif"},
        {country: "Ching chong", flag: "images/chingchong.gif"},
        {country: "Lao", flag: "images/lao.gif"},
        {country: "Myanma", flag: "images/lao.gif"}
    ],
    displayDrop: function (isBool) {
        (isBool) ? (dropdown.style.display = "block") : (dropdown.style.display = "none")
    },
    handleEvent: function () {
        const _this = this
        // Handle click event item of dropdown
        dropdown.onclick = function (e) {
            const childNode = e.target.closest('.dropdown__item')
            const item = childNode.lastElementChild.textContent
            if(_this.listItem[item]){
                childNode.classList.remove('active')
                delete _this.listItem[item]
                _this.renderItemSelect()
            }else{
                childNode.classList.add('active')
                _this.listItem[item] = item
                _this.renderItemSelect()
            }
            search.value = ''
        }
        // Handle event focus input
        document.onclick = function(e){
            if(e.target.closest('.dropdown__item') 
            || e.target.closest('.select') 
            || e.target.closest('.exit')){
                _this.displayDrop(true)
            }else{
                _this.displayDrop(false)
            }
        }
        // Handle event search item
        search.oninput = function(e){
            search.parentNode.dataset.value = search.value
            const value = e.target.value
            const listFilter = _this.data.filter(item =>
                item.country.toLowerCase().includes(value.trim().toLowerCase())
            )
            if (listFilter) {
                _this.renderDropdown(listFilter)
            }else{
                _this.renderDropdown(_this.data)
            }
        }
        // Handle event delete item
        box.onclick = function(e){
            if(e.target.closest('.exit')){
                const itemDelete = e.target.closest('.select__item').firstElementChild.textContent
                delete _this.listItem[itemDelete]
                _this.renderItemSelect()
                _this.renderDropdown(_this.data)
            }
        }
    },
    renderItemSelect: function () {
        let html = ''
        for (const key in this.listItem) {
            html += `<div class="select__item">
                    <span>${key}</span>
                    <span class="exit"><i class="fas fa-times"></i></span>
                    </div>`
        }
        box.innerHTML = html
    },
    renderDropdown: function(data){
        const htmls = data.map(item => {
            return `
                <div class="dropdown__item ${ (this.listItem[item.country])?('active'):('')}">
                <img src="${item.flag}" alt="">
                <span>${item.country}</span>
                </div> `
        })
        dropdown.innerHTML = htmls.join('')
    },
    start: function () {
        this.handleEvent()
        this.renderDropdown(this.data)
    }
}
app.start()
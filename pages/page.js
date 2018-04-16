


var basePage = function(){

    this.searchInput = $("#gh-ac");
    this.getAllByLinkText = function(linkText){
        return element.all(by.cssContainingText("a", linkText)); 
    }

    this.getByLinkText = function(linkText){
        return element(by.cssContainingText("a", linkText)); 
    }


    this.addToCartButton = $("#isCartBtn_btn"); 

    this.itemTitle = $("#itemTitle");

    this.itemAddedToCartMessage = function(itemName){ 
        return element(by.cssContainingText("span", itemName+" was just added to your cart"));
    }

    this.shoppingCartTitle = element(by.cssContainingText("h1","Your eBay Shopping Cart"));
    this.proceedToCheckoutBtn = $("#ptcBtnBottom");
    this.cart = $("#gh-cart");



}

module.exports = new basePage();
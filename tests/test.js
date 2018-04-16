

'use strict';
var page = require("../pages/page.js");
var utils = require("../common/utils.js");


describe("Demo tests", function(){
    var item1 = "The Lord of the Rings";
    var item2 = "Star Wars Complete Saga"
    // var itemToAddToCart = ["The Lord of the Rings", "Star Wars Complete Saga"]
    it("searches two items and adds to cart, and verifies addition",function(){
        addItemToCart(item1).then((completeItem1Name)=>{
            addItemToCart(item2).then((completeItem2Name)=>{
                page.cart.click().then(()=>{
                    browser.wait(page.shoppingCartTitle.isDisplayed(), 20000);
                    browser.wait(page.proceedToCheckoutBtn.isDisplayed(), 20000);
                    expect(page.getByLinkText(completeItem1Name).isDisplayed()).toBe(true, completeItem1Name+" has not been added to cart");
                    expect(page.getByLinkText(completeItem2Name).isDisplayed()).toBe(true, completeItem2Name+" has not been added to cart")
                });
            });
        });
    });
});

function addItemToCart(itemName){
    return page.searchInput.click().then(()=>{
        return page.searchInput.clear().sendKeys(itemName).sendKeys(protractor.Key.ENTER).then(()=>{
            page.getAllByLinkText(itemName).get(0).click();
            return page.itemTitle.getText().then((itemName)=>{
                page.addToCartButton.click();
                browser.wait(page.itemAddedToCartMessage(itemName).isDisplayed(), 10000, "Item '"+itemName+"' not added to cart");
                return itemName;
            });
        });
    }); 
}
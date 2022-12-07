import AssertionMethods from "../Utility/assertions";
import utilities from "../Utility/utilities";
import PageLocators from "../Locators/addToCartLocators";

let assertObj = new AssertionMethods();         //obj for class
let locatorObj = new PageLocators();

describe("Validating product is added to cart", () => {

    beforeEach(() => {
        assertObj.launchBrowser('http://practice.automationtesting.in/')
    })

    it("TC-01 : Verify home page book sliders length ", () => {
        assertObj.clickOnElement(locatorObj.menu, 0)
        assertObj.clickOnElement(locatorObj.shopMenuItem, 0)
        assertObj.clickOnElement(locatorObj.homeSubLink, 0)
        assertObj.verifyLength(locatorObj.bookSlider, 3)
    })

    it("TC-02 : Verify the length of new arrivals", () => {
        assertObj.clickOnElement(locatorObj.menu, 0)
        assertObj.verifyTextContains("new arrivals")
        assertObj.verifyText(locatorObj.newArrivalText, "new arrivals")
        cy.get(locatorObj.newArrivalText).should(utilities.haveText, "new arrivals")
        assertObj.verifyLength(locatorObj.newArrival, 3)
    })

    it.skip("TC-03 : Verify the only in-stock products can be added to cart ", () => {
        cy.get(locatorObj.newArrivalEl).each((el, index) => {
            cy.get(locatorObj.newArrivalEl).eq(index).click({ force: true })
            //cy.go(-1)  
            cy.get(locatorObj.paraText).then(el => {
                let paragraphText = el.text()
                cy.log(paragraphText)

                if (paragraphText.includes('in stock')) {
                    // cy.get(locatorObj.addtoCartBtn).click()
                    assertObj.clickOnElement(locatorObj.addtoCartBtn, 0)
                }
                else {
                    cy.go(-1)        //back
                }
            })
        })
    })

})

// //---------------------------------------

var book3Name = "";
var book3Price = ""

describe("Validating billing of product in cart", () => {
    it("TC-04 : Verify book name and product price for billing purpose", () => {
    
        assertObj.launchBrowser("http://practice.automationtesting.in/")
        cy.get(locatorObj.newArrivalEl).each((el, i) => {
            cy.get(locatorObj.newArrivalEl).eq(i).click({ force: true })
            cy.get(locatorObj.paraText).then(el => {
                let paragraphText = el.text()
                cy.log(paragraphText)

                if (paragraphText.includes("in stock")) {
                    cy.get(locatorObj.addtoCartBtn).click({force:true})
                    cy.get(locatorObj.bookName).then(el => {
                        book3Name = el.text();
                        cy.log(book3Name)
                    })
                    cy.get(locatorObj.bookPrice).first().then(el => {
                        book3Price = el.text();
                        cy.log(book3Price)
                    })
                    cy.get(locatorObj.displayedMessage)
                        .should('contain', " “Mastering JavaScript” has been added to your basket.")
                    cy.get(locatorObj.displayedMessage).should('be.visible').click()

                    assertObj.clickOnElement(locatorObj.menu, 0)
                    assertObj.clickOnElement(locatorObj.cartBtn, 0)
                    cy.get(locatorObj.cartBookText).then(el => {
                        cy.log(el.text())
                        expect(el.text()).to.eqls(book3Name)
                    })
                    cy.get(locatorObj.productAmountPrice).then(el => {
                        expect(el.text()).to.includes(book3Price)
                        cy.log(el.text())
                        cy.log(book3Price)
                    })
                }
                else {
                    cy.go(-1)
                }
            })
        })
    })
})







beforeEach('hit url', () => {
    Cypress.on("uncaught:exception", () => {
        return false;
    });
})

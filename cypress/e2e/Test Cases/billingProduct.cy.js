import AssertionMethods from "../Utility/assertions";
import utilities from "../Utility/utilities";
import Product from "../Locators/billingProduct"

let assertObj = new AssertionMethods();
let locatorObj = new Product();

describe("Validate sub total of the product in the cart", () => {
    beforeEach(() => {
        assertObj.launchBrowser('http://practice.automationtesting.in/')
    })

    it("TC-01 : Verify home page book sliders length ", () => {
        assertObj.clickOnElement(locatorObj.menu, 0)
        assertObj.clickOnElement(locatorObj.shopMenuItem, 0)
        assertObj.clickOnElement(locatorObj.homeSubLink, 0)
        assertObj.verifyLength(locatorObj.bookSlider, 3)
    })

    var bookName = ""
    var bookPrice = ""
    it.skip('verify the only in-stock products can be added to cart', () => {
        cy.fixture('billingProduct').then((locator) => {
            cy.get(locator.arrivals).each((el, index) => {
                cy.get(locator.arrivals).eq(index).click({ force: true })
            })
            cy.get('.stock').then(el => {
                let stock = el.text()
                if (stock.includes('in stock')) {
                    cy.get(locator.addtoBasket).click()
                    cy.get(locator.productTitle).then(el => {
                        bookName = el.text()
                        cy.log(bookName)
                    })
                    cy.get(locator.productPrice).first().then(el => {
                        bookPrice = el.text()
                        cy.log(bookPrice)
                    })
                    cy.get(locator.msg).should('contain', ' “Mastering JavaScript” has been added to your basket.')
                    cy.get(locator.viewBucket).click()
                    cy.get(locator.cartName)
                        .then(el => {
                            let cartBook = el.text()
                            expect(cartBook).to.equals(bookName)
                        })
                    cy.get(locator.cartPrice).then(el => {
                        let prodPrice = el.text()
                        cy.log(prodPrice)
                        expect(prodPrice).to.includes(bookPrice)
                    })
                }
                else {
                    cy.go('back')
                }
            }).then(() => {
                let qty = 1
                cy.get(locator.productQuantity).clear().type(qty)
                cy.get(locator.updateBasket).click()
                var subTotalCal = (bookPrice.replace("₹", "")) * qty;
                cy.log(subTotalCal)
                cy.wait(5000)
                cy.get(locator.subTotalOfCart).then(el => {
                    var subPriceCrt = el.text().replace('₹', "").replace('.00', "")
                    expect(subPriceCrt).to.equals(subTotalCal)
                })
            })
        })

    })
})
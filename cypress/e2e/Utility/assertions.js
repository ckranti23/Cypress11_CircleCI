class AssertionMethods {
    launchBrowser(url){
        cy.visit(url)
    }

    verifyText(element,expectedText){
        cy.get(element).should('have.text',expectedText)
    }

    verifyIndexText(element,index,expectedText){
        cy.get(element).eq(index).should("have.text",expectedText)
    }

    verifyLength(elem,expectedLength){
        cy.get(elem).should("have.length",expectedLength)
    }

    verifyExplicitText(element,expectedText){
        cy.get(element).then(el =>{
            expect(el.text()).to.eql(expectedText)
        })
    }

    verifyExplicitIndexText(element,index,expectedText){
        cy.get(element).each((el,index)=>{
            expect(el.text()).to.equals(expectedText)
        })
    }

    containsText(element,textContents){
        cy.get(element).should('contains',textContents);
    }

    containsIndexText(element,index,textContents){
        cy.get(element).eq(index).should('contains',textContents);
    }

    includesText(element,index,textContents){
        cy.get(element).should('includes',textContents);
    }

    verifyUrl(expectedUrl){
        cy.url().should('equals',expectedUrl)
    }

    verifyTitle(expectedTitle){
    cy.title().should('have.text',expectedTitle)
    }

    verifyTextContains(text){
        cy.contains(text)
    }

    clickOnElement(element, index) {
        cy.get(element).eq(index).click()
    }

    verifyVisibilityOfElement(element){
        cy.contains(element).should('be.visible')
    }

    invokeTextAndAssert(elem,indx,expectedText){
         cy.get(elem).eq(indx).then((el)=>{
             expect(el.text()).to.eq(expectedText);
         })
    }

    invokeTextAndAssertInclude(elem,ind,expText){
        cy.get(elem).eq(ind).then((el)=>{
            expect(el.text()).to.includes(expText);
        })
    }

}

export default AssertionMethods;
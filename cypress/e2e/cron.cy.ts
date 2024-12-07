describe("Cron gen", () => {
  it("Minutes passes", () => {
    cy.visit("http://localhost:3000/react-cron-generator");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get("input").clear();
    cy.get("input").type("3");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 0/3 * * * ? *");
    /* ==== End Cypress Studio ==== */
  });

  it("Hours passes", () => {
    cy.visit("http://localhost:3000/react-cron-generator");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".hours").select("03");
    cy.get(".minutes").select("06");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 06 03 1/1 * ? *");
    /* ==== End Cypress Studio ==== */

    /* ==== Generated with Cypress Studio ==== */
    cy.get('.tab-pane > :nth-child(1) > [type="radio"]').check();
    cy.get('input[type="number"]').first().clear().type("3");
    cy.get('input[type="number"]').eq(1).clear().type("15");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 15 0/3 1/1 * ? *");
    /* ==== End Cypress Studio ==== */
  });

  it("Daily passes", () => {
    cy.visit("http://localhost:3000/react-cron-generator");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(":nth-child(3) > .nav-link").click();
    cy.get('[type="Number"]').clear().type("10");
    cy.get(".hours").select("04");
    cy.get(".minutes").select("04");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 04 04 1/10 * ? *");
    cy.get(":nth-child(2) > input").check();
    cy.get(".minutes").select("08");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 08 04 ? * MON-FRI *");
    /* ==== End Cypress Studio ==== */
  });

  it("Weekly passes", () => {
    cy.visit("http://localhost:3000/react-cron-generator");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(":nth-child(4) > .nav-link").click();
    cy.get('[value="MON"]').check();
    cy.get('[value="FRI"]').check();
    cy.get('[value="THU"]').check();
    cy.get(".hours").select("07");
    cy.get(".minutes").select("08");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 08 07 ? * MON,FRI,THU *");
    /* ==== End Cypress Studio ==== */
  });

  it("Monthly passes", () => {
    cy.visit("http://localhost:3000/react-cron-generator");
    cy.get(":nth-child(5) > .nav-link").click();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 0 00 1 1/1 ? *");

    cy.get(':nth-child(1) > [type="number"]').clear().type("4");
    cy.get(".hours").select("04");
    cy.get(".minutes").select("05");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 4 1/1 ? *");

    cy.get(":nth-child(2) > input").check();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 L * ? *");

    cy.get(":nth-child(3) > input").check();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 LW * ? *");

    cy.get(':nth-child(4) > [type="radio"]').check();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 L-1 * ? *");

    cy.get(':nth-child(4) > [type="number"]').clear().type("4");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 L-4 1/1 ? *");

    cy.get(':nth-child(5) > [type="radio"]').check();
    cy.get(':nth-child(5) > [type="text"]').clear().type("1,2,4,5");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 1,2,4,5 1/1 ? *");
  });

  it("Custom passes", () => {
    cy.visit("http://localhost:3000/react-cron-generator");
    cy.get(":nth-child(6) > .nav-link").click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get("input").clear().type("0 03 04 L-4 1/1 ? *");
    /* ==== End Cypress Studio ==== */
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 03 04 L-4 1/1 ? *");
  });
});

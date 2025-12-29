describe("Cron gen - Quartz Format (Default)", () => {
  it("Minutes passes", () => {
    cy.visit("/");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get('input[type="number"]').clear();
    cy.get('input[type="number"]').type("3");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 0/3 * * * ? *");
    /* ==== End Cypress Studio ==== */
  });

  it("Hours passes", () => {
    cy.visit("/");
    cy.get(":nth-child(2) > .nav-link").click();
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
    cy.visit("/");
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
    cy.visit("/");
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
    cy.visit("/");
    cy.get(":nth-child(5) > .nav-link").click();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 0 00 1 1/1 ? *");

    cy.get(':nth-child(1) > [type="radio"]').check();
    cy.get(':nth-child(1) > [type="number"]').clear().type("4");
    cy.get(".hours").select("04");
    cy.get(".minutes").select("05");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 4 1/1 ? *");

    cy.get(':nth-child(2) > [type="radio"]').check();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 L * ? *");

    cy.get(":nth-child(3) > input").check();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 LW * ? *");

    cy.get(':nth-child(4) > [type="radio"]').check();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 L-1 * ? *");

    // Click the input to ensure it's focused and the radio is properly selected
    cy.get(':nth-child(4) > [type="number"]').click().clear().type("4");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 L-4 * ? *");

    cy.get(':nth-child(5) > [type="radio"]').check();
    cy.get('.dropdown > input').click();
    cy.get('.dropdown > .dropdown-content > :nth-child(1)').click();
    cy.get('.dropdown > .dropdown-content > :nth-child(2)').click();
    cy.get('.dropdown > .dropdown-content > :nth-child(4)').click();
    cy.get('.dropdown > .dropdown-content > :nth-child(5)').click();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 05 04 1,2,4,5 1/1 ? *");
  });

  it("Custom passes", () => {
    cy.visit("/");
    cy.get(":nth-child(6) > .nav-link").click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('input[type="text"]').clear().type("0 03 04 L-4 1/1 ? *");
    /* ==== End Cypress Studio ==== */
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 03 04 L-4 1/1 ? *");
  });
});

describe("Cron gen - Unix Format", () => {
  beforeEach(() => {
    cy.visit("/");
    // Enable Unix format
    cy.get('input[type="checkbox"]').first().check();
  });

  it("Unix format checkbox toggles format", () => {
    // Verify Unix format is enabled
    cy.get('input[type="checkbox"]').first().should("be.checked");
    cy.contains("Format: Unix (5 fields)").should("exist");
    
    // Toggle back to Quartz
    cy.get('input[type="checkbox"]').first().uncheck();
    cy.contains("Format: Quartz (7 fields)").should("exist");
  });

  it("Minutes - Unix format generates correct cron", () => {
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get("input").eq(1).clear().type("5");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0/5 * * * *");
    cy.get(".cron-builder-bg").first().should("contain", "Every 5 minutes");
  });

  it("Minutes - Different intervals in Unix format", () => {
    cy.get(":nth-child(1) > .nav-link").click();
    
    // Test 10 minutes
    cy.get("input").eq(1).clear().type("10");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0/10 * * * *");
    
    // Test 15 minutes
    cy.get("input").eq(1).clear().type("15");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0/15 * * * *");
    
    // Test 30 minutes
    cy.get("input").eq(1).clear().type("30");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0/30 * * * *");
  });

  it("Hourly - Unix format at specific time", () => {
    cy.get(":nth-child(2) > .nav-link").click();
    cy.get(".hours").select("03");
    cy.get(".minutes").select("15");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "15 03 1/1 * *");
  });

  it("Hourly - Unix format every N hours", () => {
    cy.get(":nth-child(2) > .nav-link").click();
    cy.get('.tab-pane > :nth-child(1) > [type="radio"]').check();
    cy.get('input[type="number"]').first().clear().type("2");
    cy.get('input[type="number"]').eq(1).clear().type("30");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "30 0/2 1/1 * *");
  });

  it("Daily - Unix format every N days", () => {
    cy.get(":nth-child(3) > .nav-link").click();
    cy.get('[type="Number"]').clear().type("3");
    cy.get(".hours").select("09");
    cy.get(".minutes").select("30");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "30 09 1/3 * *");
  });

  it("Daily - Unix format weekdays", () => {
    cy.get(":nth-child(3) > .nav-link").click();
    cy.get(":nth-child(2) > input").check();
    cy.get(".hours").select("08");
    cy.get(".minutes").select("00");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 08 * * 1-5");
  });

  it("Weekly - Unix format specific days", () => {
    cy.get(":nth-child(4) > .nav-link").click();
    cy.get('[value="MON"]').check();
    cy.get('[value="WED"]').check();
    cy.get('[value="FRI"]').check();
    cy.get(".hours").select("10");
    cy.get(".minutes").select("00");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 10 * * 1,3,5");
  });

  it("Weekly - Unix format all weekdays", () => {
    cy.get(":nth-child(4) > .nav-link").click();
    cy.get('[value="MON"]').check();
    cy.get('[value="TUE"]').check();
    cy.get('[value="WED"]').check();
    cy.get('[value="THU"]').check();
    cy.get('[value="FRI"]').check();
    cy.get(".hours").select("09");
    cy.get(".minutes").select("00");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 09 * * 1,2,3,4,5");
  });

  it("Monthly - Unix format specific day", () => {
    cy.get(":nth-child(5) > .nav-link").click();
    cy.get(':nth-child(1) > [type="number"]').clear().type("15");
    cy.get(".hours").select("12");
    cy.get(".minutes").select("00");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 12 15 1/1 *");
  });

  it("Custom - Unix format manual entry", () => {
    cy.get(":nth-child(6) > .nav-link").click();
    cy.get("input").eq(1).clear().type("*/10 * * * *");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "*/10 * * * *");
  });

  it("Custom - Unix format complex expression", () => {
    cy.get(":nth-child(6) > .nav-link").click();
    cy.get("input").eq(1).clear().type("0 9-17 * * 1-5");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 9-17 * * 1-5");
  });
});

describe("Cron gen - Format Conversion", () => {
  it("Converts from Quartz to Unix when toggling format", () => {
    cy.visit("/");
    
    // Set a Quartz cron (every 5 minutes) first
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get('input[type="number"]').clear().type("5");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 0/5 * * * ? *");
    
    // Toggle to Unix format
    cy.get('input[type="checkbox"]').first().check();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0/5 * * * *");
    
    // Toggle back to Quartz format
    cy.get('input[type="checkbox"]').first().uncheck();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 0/5 * * * ? *");
  });

  it("Converts from Unix to Quartz when toggling format", () => {
    cy.visit("/");
    
    // Toggle to Unix format first
    cy.get('input[type="checkbox"]').first().check();
    
    // Set a Unix cron (every 10 minutes)
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get('input[type="number"]').clear().type("10");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0/10 * * * *");
    
    // Toggle to Quartz format
    cy.get('input[type="checkbox"]').first().uncheck();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 0/10 * * * ? *");
    
    // Toggle back to Unix format
    cy.get('input[type="checkbox"]').first().check();
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0/10 * * * *");
  });

  it("Maintains human-readable text across format changes", () => {
    cy.visit("/");
    
    // Set every 5 minutes in Quartz
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get('input[type="number"]').clear().type("5");
    cy.get(".cron-builder-bg").should("contain", "Every 5 minutes");
    
    // Toggle to Unix
    cy.get('input[type="checkbox"]').first().check();
    cy.get(".cron-builder-bg").should("contain", "Every 5 minutes");
    
    // Toggle back to Quartz
    cy.get('input[type="checkbox"]').first().uncheck();
    cy.get(".cron-builder-bg").should("contain", "Every 5 minutes");
  });
});

describe("Cron gen - Edge Cases", () => {
  it("Handles empty input gracefully in Unix format", () => {
    cy.visit("/");
    cy.get('input[type="checkbox"]').first().check();
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get("input").eq(1).clear();
    // Should show default or handle gracefully
    cy.get(".cron_builder").should("exist");
  });

  it("Handles invalid Unix cron in custom field", () => {
    cy.visit("/");
    cy.get('input[type="checkbox"]').first().check();
    cy.get(":nth-child(6) > .nav-link").click();
    cy.get("input").eq(1).clear().type("invalid cron");
    // Should handle error gracefully
    cy.get(".cron_builder").should("exist");
  });

  it("Unix format - Every minute", () => {
    cy.visit("/");
    cy.get('input[type="checkbox"]').first().check();
    cy.get(":nth-child(1) > .nav-link").click();
    cy.get("input").eq(1).clear().type("1");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0/1 * * * *");
  });

  it("Unix format - Midnight daily", () => {
    cy.visit("/");
    cy.get('input[type="checkbox"]').first().check();
    cy.get(":nth-child(3) > .nav-link").click();
    cy.get(".hours").select("00");
    cy.get(".minutes").select("00");
    cy.get(".cron_builder > :nth-child(4)").should("have.text", "0 00 1/1 * *");
  });
});

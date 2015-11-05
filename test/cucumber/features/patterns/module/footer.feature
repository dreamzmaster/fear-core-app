Feature: Content typography style guide
  As a designer I want
  The footer module to have a consistent style

  @typography @footer @xsmall
  Scenario: Footer Module is rendered at a xsmall viewport
    And I am navigated to the order review page
    Then Only 1 page footer should be on the page
    Then I should see a 12px anchor link in the footer module
    Then I should see the anchor link as colour #ffffff in the footer module
    Then The padding top,bottom of the footer module should be 15px
    Then The padding left,right of the footer module should be 10px

  @typography @footer @small
  Scenario: Footer Module is rendered at a small viewport
    And I am navigated to the order review page
    Then Only 1 page footer should be on the page
    Then I should see a 12px anchor link in the footer module
    Then I should see the anchor link as colour #ffffff in the footer module
    Then The padding top,bottom of the footer module should be 15px
    Then The padding left,right of the footer module should be 10px

  @typography @footer @medium
  Scenario: Footer Module is rendered at a medium viewport
    And I am navigated to the order review page
    Then Only 1 page footer should be on the page
    Then I should see a 12px anchor link in the footer module
    Then I should see the anchor link as colour #ffffff in the footer module
    Then The padding top,bottom of the footer module should be 3px
    Then The padding left,right of the footer module should be 10px

  @typography @footer @large
  Scenario: Footer Module is rendered at an large viewport
    And I am navigated to the order review page
    Then Only 1 page footer should be on the page
    Then I should see a 12px anchor link in the footer module
    Then I should see the anchor link as colour #ffffff in the footer module
    Then The padding top,bottom of the footer module should be 3px
    Then The padding left,right of the footer module should be 10px

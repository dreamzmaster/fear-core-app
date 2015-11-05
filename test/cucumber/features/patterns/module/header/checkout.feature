Feature: Checkout Header Images
  As a designer I want
  The checkout header module to be consistent with the pattern library

  @images @headerCheckout @xsmall
  Scenario: Checkout Header Module is rendered at an xsmall viewport
    And I am navigated to the order review page
    Then I should see a logo with dimensions of 68px by 42px
    Then I should see a logo aligned to center with a negative margin-left of -34px

  @images @headerCheckout @small
  Scenario: Checkout Header Module is rendered at a small viewport
    And I am navigated to the order review page
    Then I should see a logo with dimensions of 68px by 42px
    Then I should see a logo aligned to center with a negative margin-left of -34px

  @images @headerCheckout @large
  Scenario: Checkout Header Module is rendered at a large viewport
    And I am navigated to the order review page
    Then I should see a logo with dimensions of 78px by 48px
    Then I should see a logo aligned to the left

  @layout @headerCheckout @xsmall
  Scenario: Checkout Header Module is rendered at an xsmall viewport
    And I am navigated to the order review page
    Then I should see the progress steps items as inline on the checkout header
    Then I should see the progress steps items aligned center on the checkout header

  @layout @headerCheckout @small
  Scenario: Checkout Header Module is rendered at a small viewport
    And I am navigated to the order review page
    Then I should see the progress steps items as inline on the checkout header
    Then I should see the progress steps items aligned center on the checkout header

  @layout @headerCheckout @medium
  Scenario: Checkout Header Module is rendered at a medium viewport
    And I am navigated to the order review page
    Then I should see the progress steps items as inline on the checkout header
    Then I should see the progress steps items aligned center on the checkout header

  @layout @headerCheckout @large
  Scenario: Checkout Header Module is rendered at a large viewport
    And I am navigated to the order review page
    Then I should see the progress steps items as inline on the checkout header
    Then I should see the progress steps items aligned center on the checkout header

  @typography @headerCheckout @small
  Scenario: Checkout Header Module is rendered at an small viewport
    And I am navigated to the order review page
    Then I should see a 15px step number in the progress steps module
    Then I should see a 15px text in the progress steps module
    Then I should see the completed link as hex colour #333333 in the progress steps module
    Then I should see the active text as hex colour #000000 in the progress steps module
    Then I should see the incomplete text as hex colour #cccccc in the progress steps module

  @typography @headerCheckout @medium
  Scenario: Checkout Header Module is rendered at a medium viewport
    And I am navigated to the order review page
    Then I should see a 20px step number in the progress steps module
    Then I should see a 20px text in the progress steps module
    Then I should see the completed link as hex colour #333333 in the progress steps module
    Then I should see the active text as hex colour #000000 in the progress steps module
    Then I should see the incomplete text as hex colour #cccccc in the progress steps module

  @typography @headerCheckout @large
  Scenario: Checkout Header Module is rendered at a large viewport
    And I am navigated to the order review page
    Then I should see a 25px step number in the progress steps module
    Then I should see a 25px text in the progress steps module
    Then I should see the completed link as hex colour #333333 in the progress steps module
    Then I should see the active text as hex colour #000000 in the progress steps module
    Then I should see the incomplete text as hex colour #cccccc in the progress steps module

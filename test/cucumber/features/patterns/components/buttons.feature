@patterns @buttons
Feature: Base Button Component Definition
  As a css base button component
  I need to define all button element attributes
  So that the user interface displays buttons in the M&S standard design

@buttonTypes @breakpoint-all
  Scenario Outline: Base Button class Component - Buttons
    Given I am navigated to the order review page
    Then the <title> background colour should be defined as “<bg-color>”
    And the <title> border colour should be defined as “<bdr-color>”
    And the font colour should be defined as “#333333”
    And the font size should be defined as “15px”
    And the font family should be defined as “helvetica-medium, Helvetica, Arial, sans-serif”
    And the padding should be defined as “6px” “18px”
    And the bottom margin should be defined as “0px”
    And the hover over background colour should be defined as “<bg-hover>”
    And the hover over border colour should be defined as “<bdr-hover>”
    And the mobile width should be defined as “100%”
    And the mobile maximum width should be defined as “300px”

  @patterns
  Examples:
    | title | bg-color | bdr-color | bg-hover | bdr-hover |
    | primary | #bdd755 | #aac14c | #bdd755 | #a0b648 |
    | secondary | #E0E0E0 | #c9c9c9 | #d4d4d4 | #bebebe |
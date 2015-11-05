@patterns @lightbox
Feature: LightBox Style Guide
  As a designer I want
  Lightbox to reflect style guide

  @breakpoint-all
  Scenario Outline: Lightbox has got the correct styling
    And I am navigated to the <page> page
    When I open a <buttonId> lightbox
    Then I should see close button in top right corner of the lightbox
    And Close button is 30px by 30px
    And Padding around close button is 10px
    And I should see top padding is 10px
    And I should see right padding is 20px
    And I should see bottom padding is 24px
    And I should see left padding is 20px
    And I should see lightbox background is #000000
    And 30% opacity is shown underneath
    When I hover over the close button
    Then I should see lightbox colour is changed to #000000
    When I tap/click on close button
    Then I should see lightbox colour is changed to stronger #000000

  @patterns
  Examples:
    | page | buttonId |
    | pattern lightbox | lb-ajax |
    | pattern lightbox | lb-inline |

  @application
  Examples:
    | page | buttonId |
    | order review | lbGiftMsg |

  @small
  Scenario Outline: Lightbox is rendered at an small viewport
      And I am navigated to the <page> page
      When I open a <buttonId> lightbox
      Then I should see lightbox fit to width of the screen

  @patterns
  Examples:
    | page | buttonId |
    | pattern lightbox | lb-inline |

  @application
  Examples:
    | page | buttonId |
    | order review | lbGiftMsg |

  @large
  Scenario Outline: Lightbox content is scrollable
  And I am navigated to the <page> page
  When I open a <buttonId> lightbox
  Then I should be able to scroll the content up and down

  @patterns
  Examples:
  | page | buttonId |
  | pattern lightbox | lb-inline |

  @application
  Examples:
  | page | buttonId |
  | order review | lbGiftMsg |

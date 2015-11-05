@lightbox @patterns
Feature: LightBox Style Guide
  As a designer I want
  Lightbox to have core functionality

  @large
  Scenario Outline: I can open and close a light box
    And I am navigated to the <page> page
    When I open a <buttonId> lightbox
    Then the lightbox should be open
    When I click the close button
    Then the lightbox should be closed

    @patterns
    Examples:
    | page | buttonId |
    | pattern lightbox | lb-ajax |
    | pattern lightbox | lb-inline |

    @application
    Examples:
    | page | buttonId |
    | order review | lbGiftMsg |

  @large @ajax-lightbox
  Scenario Outline: Ajax Lightbox loads data
    And I am navigated to the <page> page
    And I open a <buttonId> lightbox
    Then I should see ajax data in content area

    @patterns
    Examples:
    | page | buttonId |
    | pattern lightbox | lb-ajax |

Feature: Inpage messages
  As a designer I want
  The inpage message boxes to be styled correctly

  @patterns @inpageMessage @xsmall
  Scenario Outline: An message apears on a small screen
    And I am navigated to the pattern in page message page
    Then I should see a <box> box with the background hex colour <background> and the border as hex colour <border>
    Then I should see a <box> box with an icon as hex colour <iconColour>
    Then I should see a <box> box with the body text of the box with the font as hex colour <bodyFontColour>
    Then I should see a <box> box with an icon that has font size 18px
    Then I should see a <box> box with the body font size 14pt and the font "helvetica-roman, Helvetica, Arial, sans-serif"

  Examples:
    | box | background | border | iconColour | bodyFontColour |
    |  error   |  #FFF3F4  |  #EA122A  | #EA122A | #EA122A |
    |  success   |  #F5F9E5  |  #A9C14B  | #A9C14B | #333333 |
    |  info   |  #FFFFCA  |  #FFCD00  | #FFCD00 | #333333 |

  @patterns @inpageMessage @large
  Scenario Outline: An message apears on a large screen
    And I am navigated to the pattern in page message page
    Then I should see a <box> box with the background hex colour <background> and the border as hex colour <border>
    Then I should see a <box> box with an icon as hex colour <iconColour>
    Then I should see a <box> box with the body text of the box with the font as hex colour <bodyFontColour>
    Then I should see a <box> box with an icon that has font size 24px
    Then I should see a <box> box with the body font size 14pt and the font "helvetica-roman, Helvetica, Arial, sans-serif"
    Then I should see a <box> box with the title of the box with font "helvetica-light, Helvetica, Arial, sans-serif", font size 18px

  Examples:
    | box | background | border | iconColour | bodyFontColour |
    |  error   |  #FFF3F4  |  #EA122A  | #EA122A | #EA122A |
    |  success   |  #F5F9E5  |  #A9C14B  | #A9C14B | #333333 |
    |  info   |  #FFFFCA  |  #FFCD00  | #FFCD00 | #333333 |

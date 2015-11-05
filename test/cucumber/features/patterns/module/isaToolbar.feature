#Feature: ISA Toolbar typography style guide
#  As a designer I want
#  The ISA Toolbar module to have a consistent style
#
#  @isaToolbarModule
#  Scenario Outline: IsaToolbar Module store user logged in
#    Given I am navigated to the Order Review page
#    Then I see the docked bar
#    And The colour of the bar is #333333
#    And The darker Bg colour underneath the Seller, Customer and Account links is #000000
#    And The dropshadow is colour #000000
#    And The height of the bar is 60px
#    And The left and right padding is 35px
#    And The text links are in Helvetica Neue 55Roman, Size 14px, Colour #FFFFFF
#    And The off state of the number indicator is Georgia bold italic, Size 14px, Colour #CCCCCC
#
#  @isaToolbarModule
#  Scenario Outline: IsaToolbar Module store user logged in and customer is enacted
#    Given I am navigated to the Order Review page
#    When I enacted customer
#    And The 'Customer' word is in Helvetica Neue 55Roman, Size 14px, Colour #FFFFFF
#    And The names of the seller and customer are in Helvetica Neue 75Bold, Size 14px, Colour #FFFFFF
#    And The 'Sign out' and 'Wrap up' links are in Helvetica Neue 55Roman, Size 14px, Colour #CCCCCC, Style: underline
#    And The number indicator is Georgia bold italic, Size 14px, Colour #BDD752
#    #And the off state of the text links is Helvetica Neue 55Roman, Size 14px, Colour #CCCCCC
#    And The divider line is 1px dotted #FFFFFF
#
#  @isaToolbarModule
#  Scenario: IsaToolbar Module store user not logged in
#  Given I am navigated to the home page
#  Then I don't see the docked bar
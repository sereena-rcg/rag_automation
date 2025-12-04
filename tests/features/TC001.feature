@jira:GAP-101
Feature: Travel and Tourism Automation

  Scenario: TC001 - Retrieve booking and capture Total Amount Paid
    Given User navigates to the Selling App portal and clicks on the Retrieve Bookings tab
    When Booking ID G22232 is entered in the Booking Ref No/CartID field and the Search button is clicked
    Then The system displays booking details and shows the Total Amount Paid value in the Selling App

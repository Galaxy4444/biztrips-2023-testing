describe('Home Page', () => {
  it('should display the correct title', () => {
    cy.visit('http://localhost:3000'); // Replace with your application's URL
    cy.contains('h1', 'Welcome to biztrips Happy new Year-react - 2024'); // Replace with the expected title
  });
});
describe('Article creation and delete', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('User should be able to create an article', () => {
    cy.login(user.email, user.username, user.password);
    cy.visit('/editor');

    cy.createArticle().then(({ title, description, body, tagList }) => {
      cy.findByPlaceholder('Article Title').type(title);
      cy.findByPlaceholder(`What's this article about?`).type(description);
      cy.findByPlaceholder('Write your article (in markdown)').type(body);
      cy.findByPlaceholder('Enter tags').type(tagList);

      cy.get('.btn').contains('Publish Article').click();
      cy.get('h1').should('contain.text', title);
    });
  });

  it('User should delete the created article', () => {
    cy.login(user.email, user.username, user.password);
    cy.createArticle().then((article) => {
      cy.visit(`/article/${article.slug}`);
    });

    cy.get('.btn').contains('Delete Article').click();
    cy.get('.article-preview').should('contain.text'
      , 'No articles are here... yet.');
  });
});

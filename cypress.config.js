const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://conduit.mate.academy/',
    viewportHeight: 600,
    viewportWidth: 400,
    defaultCommandTimeout: 6000,

    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const email = faker.internet.email();
          const randomNumber = Math.floor(Math.random() * 1000);
          return {
            username: faker.person.firstName() + randomNumber,
            email: email.toLowerCase(),
            password: '12345Qwert!'
          };
        },

        generateArticle() {
          const title = faker.lorem.words(3);
          const description = faker.lorem.sentence();
          const body = faker.lorem.paragraph();
          const tag = 'test1';
          return {
            title,
            description,
            body,
            tag
          };
        }
      });
    }
  }
});

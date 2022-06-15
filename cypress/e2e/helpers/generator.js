const faker = require('@faker-js/faker');

function generateEmail () {
  return faker.internet.email()
}

function generatePassword () {
  return faker.internet.password()
}

function generateUserName ( ) {
  return faker.internet.userName()
}

function generateArticle(tagsNumber) {
  const tags = []
  for(let i = 1; i <= tagsNumber; i++) {
    tags.push(faker.random.word())
  }
  return {
    title: faker.random.words(),
    description: faker.random.words(),
    body: faker.random.words(),
    tagList: tags,
    }
}

module.exports = {generateEmail, generateUserName, generatePassword, generateArticle}
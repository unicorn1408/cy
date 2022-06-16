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
  let tags = ''
  console.log(tags)
  for(let i = 1; i <= tagsNumber; i++) {
    const tag = faker.random.word()

    if(tags === '') {
      tags = tag
    } else {
      tags = tags +', ' + tag
    }
  }
  return {
    title: faker.random.words(),
    description: faker.random.words(),
    body: faker.random.words(),
    tagList: tags,
    }
}

module.exports = {generateEmail, generateUserName, generatePassword, generateArticle}
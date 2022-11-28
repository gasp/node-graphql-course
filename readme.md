use `git tag` to see chapters:

# starter version

get the initial version with
`git checkout schema`

## what's inside:
  * express
  * apollo as express middleware
  * graphql.js for schema definition

## sources:
  * [apollo server](https://www.apollographql.com/docs/apollo-server/getting-started/)
  * [apollo server express middleware](https://www.apollographql.com/docs/apollo-server/api/express-middleware/)

# simple schema

## sources:
* [graphql types](https://graphql.org/graphql-js/type/)

## todo
* get on localhost:8001/graphql
* query book with bookId: "b1"
* add fields
  * add _isbn_ (string)
  * add _price_ (in cents: 14,99€ -> 1499)
  * add _is explicit content_ (boolean)
  * add _binding_ (enum: soft cover, hard cover, pocket, special format)

# sub queries

upsync with `git checkout multiple`

## todo
* add author (tutorial)
* add other entities
  * books editors
  * authors countries
  * editors countries

* compose new queries using the [starwars api](https://studio.apollographql.com/public/star-wars-swapi/explorer?variant=current)

for example: In episode 4 (A new Hope, id="ZmlsbXM6MQ=="), display all homeworlds of all starship pilots (and their population),

[A New Hope](https://starwars.fandom.com/wiki/Star_Wars:_Episode_IV_A_New_Hope) → [Millennium Falcon](https://starwars.fandom.com/wiki/Millennium_Falcon) → [Chewbacca](https://starwars.fandom.com/wiki/Chewbacca) → [Kashyyyk](https://starwars.fandom.com/wiki/Kashyyyk) → Population: 45000000


# fine tuning
## todo
  * deprecate author.name into author.fname and author.lname


# mutations
upsync with `git checkout mutation`

## todo
* add an author (tutorial)
* edit an author
* add a book
* remove an author (what happens to their book?)

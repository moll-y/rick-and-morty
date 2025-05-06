# GraphQL

## Features
- Search Character by Status, Species, Gender, and Origin.
- Sort Characters by name (server side or client side, that's the question).
- A Character has Comments.
- A Character can be marked as favorite.
- A Character can be soft-deleted.

## Entity Relationship Diagram
```mermaid 
erDiagram
  CHARACTER ||--o{ COMMENT : has
  CHARACTER {
    int id PK
    string name "The name of the character."
    string status "The status of the character ('Alive', 'Dead' or 'unknown')."
    string species "The species of the character."
    string gender "The gender of the character ('Female', 'Male', 'Genderless' or 'unknown')."
    string origin "Name of the character's origin location."
    string image_url "Link to the character's image (300x300px)."
    string created_at "Time at which the character was created in the database."
  }
  COMMENT {
    int id PK
    int character_id FK
    string text "The content of the comment as plain text."
    string created_at "Time at which the character was created in the database."
  }
```


curl -X POST http://localhost:4000/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query GetCharacters($name: String, $status: Status) { characters(name: $name, status: $status) { id name } }",
    "variables": { "name": "Rick", "status": "Alive" }
  }'

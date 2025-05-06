import { Op, WhereOptions } from "sequelize";
import { Character } from "domain/character.model";
import { Comment } from "domain/comment.model";
import { buildSchema, GraphQLSchema } from "graphql";
import { Redis } from "ioredis";

export class GraphController {
  public redis: Redis;

  public constructor(redis: Redis) {
    this.redis = redis;
  }

  public buildSchema(): GraphQLSchema {
    return buildSchema(`
      type Character {
        id: ID!
        name: String!
        status: String!
        species: String!
        gender: String!
        origin: String!
        imageUrl: String!
        comments: [Comment]
        createdAt: String!
      }
      type Comment {
        id: ID!
        text: String!
        createdAt: String!
      }
      enum Status {
        Alive
        Dead
        unknown
      }
      enum Species {
        Human
        Alien
      }
      type Query { 
        character(id: Int): Character
        characters(name: String, status: Status, species: Species, origin: String): [Character!]!
      }
      type Mutation {
        addComment(characterId: ID!, text: String!): Comment
      }
  `);
  }

  public addComment() {
    return async ({
      characterId,
      text,
    }: {
      characterId: number;
      text: string;
    }): Promise<Comment | Error> => {
      const character = await Character.findByPk(characterId);
      if (!character) {
        return new Error("Character not found");
      }
      let cursor = "0";
      do {
        const [next, keys] = await this.redis.scan(
          cursor,
          "MATCH",
          "*",
          "COUNT",
          100,
        );
        cursor = next;
        if (keys.length > 0) {
          await this.redis.del(...keys);
        }
      } while (cursor !== "0");
      return Comment.create({ text, characterId });
    };
  }

  public getCharacterById() {
    return async ({ id }: { id: string }): Promise<Character | null> => {
      const cachedCharacter = await this.redis.get(id);
      if (cachedCharacter !== null) {
        return JSON.parse(cachedCharacter);
      }
      const character = await Character.findByPk(id, {
        include: [{ model: Comment, as: "comments" }],
      });
      const characterToCache = JSON.stringify(character);
      await this.redis.set(id, characterToCache);
      return character;
    };
  }

  public getCharactersByFilter() {
    return async ({
      name,
      status,
      species,
      origin,
    }: {
      name?: string;
      status?: "Alive" | "Dead" | "unknown";
      species?: "Human" | "Alien";
      origin?: string;
    }): Promise<Character[]> => {
      const { key, where } = this.buildFilter({
        name,
        status,
        species,
        origin,
      });
      const cachedCharacters = await this.redis.get(key);
      if (cachedCharacters !== null) {
        return JSON.parse(cachedCharacters);
      }
      const characters = await Character.findAll({
        where,
        include: [
          {
            model: Comment,
            as: "comments",
          },
        ],
      });
      const charactersToCache = JSON.stringify(characters);
      await this.redis.set(key, charactersToCache);
      return characters;
    };
  }

  private buildFilter({
    name,
    status,
    species,
    origin,
  }: {
    name?: string;
    status?: string;
    species?: string;
    origin?: string;
  }): { key: string; where: WhereOptions } {
    let key = "where:";
    const where: WhereOptions = {};
    if (status) {
      where.status = status;
      key = status;
    }
    if (name) {
      where.name = { [Op.like]: `%${name}%` };
      key += name;
    }
    if (origin) {
      where.origin = { [Op.like]: `%${origin}%` };
      key += origin;
    }
    if (species) {
      // Any specie different from "Human" is considered "Alien".
      where.species = species === "Alien" ? { [Op.ne]: "Human" } : species;
      key += species;
    }
    return { key, where };
  }
}

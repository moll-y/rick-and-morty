import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  NonAttribute,
} from "sequelize";
import { sequelize } from "infrastructure/sequelize/config";
import { Comment } from "domain/comment.model";

class Character extends Model<
  InferAttributes<Character, { omit: "comments" }>,
  InferCreationAttributes<Character>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare status: string;
  declare species: string;
  declare gender: string;
  declare origin: string;
  declare imageUrl: string;
  declare comments?: NonAttribute<Comment[]>;
  declare createdAt: CreationOptional<Date>;
  declare deletedAt: CreationOptional<Date>;
}

Character.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    species: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    origin: { type: DataTypes.STRING, allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    deletedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: "Character",
    tableName: "characters",
    timestamps: true,
    updatedAt: false,
    paranoid: true,
  },
);

Character.hasMany(Comment, {
  sourceKey: "id",
  foreignKey: "characterId",
  as: "comments",
});

export { Character };

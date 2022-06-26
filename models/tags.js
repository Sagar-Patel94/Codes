module.exports = (sequelize, DataTypes) => {
    const Tags = sequelize.define("tags", {
        name: DataTypes.STRING,
    }, {
        createdAt:'create_at',
        updatedAt:'modified_at',
    });
    return Tags;
}
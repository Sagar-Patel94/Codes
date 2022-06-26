module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define("employee", {
        name: DataTypes.STRING,
        userId: DataTypes.INTEGER
    }, {
        paranoid:true,
        deletedAt:'softDelete',
        createdAt:'create_at',
        updatedAt:'modified_at' 
    });
    return Employees;
}
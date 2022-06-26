module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define("student", {
        name: DataTypes.STRING
    }, {
        underscored:true,
        // tableName:'studentssq'
        // createdAt:'create_at',
        // updatedAt:'modified_at' 
    });
    return Student;
}
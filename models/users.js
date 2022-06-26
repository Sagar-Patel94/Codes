const { users } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            // set(value) {
            //     this.setDataValue('name', value+' Patel')
            // },
            get() {
                return this.getDataValue('name')+' XYZ ' +this.email;
            }
        },
        email: {
            type: DataTypes.STRING,
            // defaultValue: 'test@gmail.com',
            allowNull:false,
            unique:true
            // set(value) {
            //     this.setDataValue('email', value+'@gmail.com')
            // }
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                // equals: {
                //     args: 'male',
                //     msg: 'Please enter male'
                // },
                isIn: {
                    args: [['male','female']],
                    msg: "Please select from male/female"
                } 
                // isIn: [['male','female']]
            }
        }
    },{
        // tableName: 'userdata',
        // timestamps: false,
        // updatedAt: false,
        // createdAt: false,
        createdAt: 'create_at',
        updatedAt: 'modified_at',
        // engine: 'MYISAM',
        // hooks:{
        //     beforeValidate:(user,options) => {
        //         user.name = 'dummy test data';
        //     },
        //     afterValidate:(user,options) => {
        //         // user.name = 'Ramesh';
        //     }
        // }
    });
    // second
    Users.addHook('beforeValidate','customName', (user, options) => {
        user.name = 'first hook';
    });

    Users.afterValidate('myHookLast', (user,options) => {
        // user.name = 'new hook after';
        // remove hook
        Users.removeHook('beforeValidate', 'customName');
    })

    return Users;
}
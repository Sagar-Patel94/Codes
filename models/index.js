const {Sequelize, DataTypes} = require('sequelize');
    
const sequelize = new Sequelize('sagar', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true,
    pool: {max:5,min:0,idle:10000}
});

sequelize.authenticate()
.then(() => {
    console.log("connected");
})
.catch(err => {
    console.log("Error"+err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({force: false, match: /sagar$/})
.then(() => {
    console.log("Yes re-sync");
})
db.users = require('./users')(sequelize,DataTypes);
db.posts = require('./posts')(sequelize,DataTypes);
db.tags = require('./tags')(sequelize,DataTypes);
db.post_tag = require('./post_tag')(sequelize,DataTypes);
db.student = require('./student')(sequelize,DataTypes);

// scope
db.users.addScope('checkStatus', {
    where:{
        status:1,
    }
});

db.users.addScope('checkGender', {
    where:{
        gender:'male',
    }
});

db.users.addScope('includePost', {
    include:{
        model:db.posts,
        attributes:['title','content']
    }
});

db.users.addScope('selectUsers', {
    attributes:['name','email']
});

db.users.addScope('limitCheck', {
    limit:2
});

// one-to-one
db.users.hasOne(db.posts,{foreignKey:'user_id', as:'postDetail'}); // default userId

// one-to-many
db.users.hasMany(db.posts,{foreignKey:'user_id'}); // default userId
db.posts.belongsTo(db.users,{foreignKey:'user_id', as :'userInfo'});

// many-to-many
db.posts.belongsToMany(db.tags,{through:'post_tag'});
db.tags.belongsToMany(db.posts,{through:'post_tag'});

// polymorphic one to many
db.video = require('./video')(sequelize,DataTypes);
db.image = require('./image')(sequelize,DataTypes);
db.comment = require('./comment')(sequelize,DataTypes);
db.employee = require('./employees')(sequelize,DataTypes);

db.image.hasMany(db.comment, {
    foreignKey:'commentableId',
    constraints:false,
    scope:{
        commentableType:'image'
    }
});

db.video.hasMany(db.comment, {
    foreignKey:'commentableId',
    constraints:false,
    scope:{
        commentableType:'video'
    }
});

db.comment.belongsTo(db.image, {
    foreignKey:'commentableId',
    constraints:false
});

db.comment.belongsTo(db.video, {
    foreignKey:'commentableId',
    constraints:false
});

// polymorphic many to many
db.tag_taggable = require('./tag_taggable')(sequelize, DataTypes);

// image to tag
db.image.belongsToMany(db.tags, {
    through:{
        model:db.tag_taggable,
        unique:false,
        scope:{
            taggableType: 'image'
        }
    },
    foreignKey:'taggableId',
    constraints:false
});

// tag to image
db.tags.belongsToMany(db.image, {
    through:{
        model:db.tag_taggable,
        unique:false,
        scope:{
            taggableType: 'image'
        }
    },
    foreignKey:'tagId',
    constraints:false
});

// video to tag
db.video.belongsToMany(db.tags, {
    through:{
        model:db.tag_taggable,
        unique:false,
        scope:{
            taggableType: 'video'
        }
    },
    foreignKey:'taggableId',
    constraints:false
});

// tag to video
db.tags.belongsToMany(db.video, {
    through:{
        model:db.tag_taggable,
        unique:false,
        scope:{
            taggableType: 'video'
        }
    },
    foreignKey:'tagId',
    constraints:false
});

module.exports = db;
var db = require("../models");

const Users = db.sequelize.models.users;
const Posts = db.sequelize.models.posts;
const Tags = db.sequelize.models.tags;
const Image = db.sequelize.models.image;
const Comment = db.sequelize.models.comment;
const Video = db.sequelize.models.video;
const Employee = db.sequelize.models.employee;
//console.log(Users,"Users");

const { Sequelize, Op, QueryTypes, DataTypes } = require("sequelize");
const { response } = require("express");
const res = require("express/lib/response");

var addUser = async (req, resp) => {
  // let data = await Users.build({name: 'Test', email: 'test2@gmail.com'});
  // await data.save();

  let data = await Users.create({
    name: "demolast2",
    email: "demo13@gmail.com",
  });

  // update

  // data.name = 'dummy';
  // data.save();

  // delete
  // data.destroy();
  // console.log(data.dataValues);

  // reload
  data.name = "dummy";
  data.reload();

  let response = {
    data: "ok",
  };
  resp.status(200).json(response);
};

var crudOperation = async (req, resp) => {
  // insert
  // let data = await Users.create({name: 'demolast2', email: 'demo13@gmail.com', gender: 'male'});

  // update
  // let datas = await Users.update({name: 'final'}, {
  //     where: {
  //         id:1
  //     }
  // });

  // delete
  // let data = await Users.destroy({
  //     where: {
  //         id: 18
  //     }
  // });

  // truncate
  // let data = await Users.destroy({
  //     truncate: true
  // })

  // bulk insert
  // let datas = await Users.bulkCreate([
  //     {name: 'first', email: 'first@gmail.com', gender: 'male'},
  //     {name: 'first1', email: 'first1@gmail.com', gender: 'male'},
  //     {name: 'first2', email: 'first2@gmail.com', gender: 'male'},
  //     {name: 'first3', email: 'first3@gmail.com', gender: 'male'}
  // ])

  // find
  let data = await Users.findAll({});

  let response = {
    data: data,
  };
  resp.status(200).json(response);
};

var queryData = async (req, resp) => {
  // let data = await Users.create({name: 'sagar', email: 'sagar@gmail.com', gender: 'male'}, {
  //     fields: ['email', 'gender']
  // });
  // let responce = {
  //   data: data
  // } 
  // resp.status(200).json(responce);
    
  // select
  // let data = await Users.findAll({
  //     attributes: [
  //         'name', ['email','emailID'],
  //         [Sequelize.fn('CONCAT', Sequelize.col('email'),' ID'),'emailCount']
  //     ]
  // });
  // let responce = {
  //     data: data
  //   } 
  //   resp.status(200).json(responce);

  // include exclude
    // let data = await Users.findAll({
    //   attributes: {
    //     exclude: ["create_at", "modified_at"],
    //     include: [
    //       [Sequelize.fn("CONCAT", Sequelize.col("name"), " Singh"), "fullName"],
    //     ],
    //   },
    // });
    // let responce = {
    //       data: data
    //     } 
    //     resp.status(200).json(responce);

  // condition
    let data = await Users.findAll({
        where: {
          //   id: 1
          // id: {
          //     [Op.gt]:2
          // },
          email: {
              [Op.like]: '%@gmail.com'
          }
        },
        // order: [
            // ['name', 'DESC'],
        //   //   ['email', 'DESC']
        // ],
        group:['name'],
        limit: 2,
        offset: 6
    });
    let responce = {
            data: data
          } 
          resp.status(200).json(responce);

  // let data = await Users.count({});

  // let response = {
  //   data: data,
  // };
  // resp.status(200).json(response);
};

var finderData = async (req, resp) => {
  // let data = await Users.findAll({});
  // let data = await Users.findOne({});
  // let data = await Users.findByPk(4);
  // let data = await Users.findAndCountAll({
  //     where: {
  //         email: 'first@gmail.com'
  //     }
  // });

  // let [data, created] = await Users.findOrCreate({
  //     where: {name: 'dummya'},
  //     defaults: {
  //         email: 'dummya@gmail.com',
  //         gender: 'male'
  //     }
  // });
  // let response = {
  //     data: data,
  //     add: created
  // }
  let data = await Users.findAll({});
  resp.status(200).json(data);
};

var setterGetter = async (req, resp) => {
  // let data = await Users.create({name: 'Test', email: 'done', gender: 'male'});
  let data = await Users.findAll({});
  let response = {
    data: data,
  };
  resp.status(200).json(response);
};

var validationCont = async (req, resp) => {
  try {
    let data = await Users.create({
      name: "Test",
      email: "test@gmail.com",
      gender: "male",
    });
  } catch (e) {
    const messages = {};
    e.errors.forEach((error) => {
      let message;
      // console.log(error, "error find");
      // switch (error.validatorKey) {
      //   case "not_unique":
      //     message = 'Duplicate Email';
      //     break;

      //   case "isIn":
      //     message = error.message;
      //     break;

      //   case "equals":
      //     // console.log(error.message, "error message");
      //     message = error.message;
      //     break;
      // }
      message = error.message;
      messages[error.path] = message;
      console.log(message, "message find");
    });
  }
  let response = {
    data: "me",
  };
  resp.status(200).json(response);
};

var rawQuery = async (req, resp) => {
  const users = await db.sequelize.query(
    "Select * from users where gender = $gender",
    {
      type: QueryTypes.SELECT,
      // model: Users,
      // mapToModel: true,
      // raw: true,
      // replacements: {gender: 'male'}, // gender = :gender
      // replacements:['male'], // gender = ?
      // replacements:{gender: ['male', 'female']}, // gender IN(:gender)
      // replacements: {searchEmail: '%@gmail.com'}, // email LIKE: searchEmail
      bind: { gender: "males" },
    }
  );
  let response = {
    data: "Raw Quary",
    record: users,
  };
  resp.status(200).json(response);
};

var oneToOne = async (req, res) => {
  let data = await Users.findAll({
    attributes: ["name", "email"],
    include: [
      {
        model: Posts,
        as: "postDetail",
        attributes: ["title", ["name", "PostName"]],
      },
    ],
    where: { id: 1 },
  });
  res.status(200).json(data);
};

var belongsTo = async (req, res) => {
  let data = await Posts.findAll({
    attributes: ["content", "title"],
    include: [
      {
        model: Users,
        as: "userInfo",
        attributes: ["name", "email"],
      },
    ],
  });
  res.status(200).json(data);
};

var oneToMany = async (req, res) => {
  let data = await Users.findAll({
    attributes: ["name", "email"],
    include: [
      {
        model: Posts,
        as: "postDetail",
        attributes: ["title", ["name", "PostName"]],
      },
    ],
    // where :{id:8}
  });
  res.status(200).json(data);
};

var manyToMany = async (req, res) => {
  // tags to post
  // let data = await Posts.findAll({
  //   attributes:['title','content'],
  //   include:[{
  //     model:Tags,
  //     attributes:['name'],
  //   }]
  // });

  // tags to post
  let data = await Tags.findAll({
    attributes: ["name"],
    include: [
      {
        model: Posts,
        attributes: ["title"],
      },
    ],
  });

  res.status(200).json(data);
};

var loading = async (req, res) => {
  // lazy loading
  // let data = await Users.findOne({where:{id:8}});
  // let postData = await data.getPosts();
  // console.log(postData,"postData find");

  // let responce = {
  //   users:data,
  //   posts:postData
  // }

  // eager loading
  let data = await Users.findOne({
    include:[{
      required:true,
      model:Posts,
      attributes:['name']
    }],
    where:{id:8}
  });
  let responce = {
      users:data,
      // posts:postData
    }
  res.status(200).json(responce);
};

var scopes = async (req, res) => {
  // let data = await Users.scope(['checkStatus','checkGender']).findAll({});

  // let data = await Posts.findAll({
  // //   include:[{
  // //     model:Users, as :'userInfo'
  // //   }]
  // // });
  let data = await Users.scope([
    "includePost",
    "selectUsers",
    "limitCheck",
  ]).findAll({});
  res.status(200).json(data);
};

var polymorphic = async (req, res) => {
  // image to comment
  // let data = await Image.findAll({
  //   include:[{
  //     model:Comment
  //   }]
  // });

  // // video to comment
  // let data = await Video.findAll({
  //   include:[{
  //     model:Comment
  //   }]
  // });

  // comment to video/image
  let data = await Comment.findAll({
    include: [Image],
  });

  res.status(200).json(data);
};

var polymorphicMany = async (req, res) => {
  // image to tag
  // let data = await Image.findAll({
  //   include:[Tags]
  // });

  // video to tag
  // let data = await Video.findAll({
  //   include: [Tags],
  // });

// tag to video or image
let data = await Tags.findAll({
  include:[Video, Image]
})

  res.status(200).json(data);
};

var paranoid = async (req, resp) => {
  let data = await Employee.findAll({});

  // data with softdelete /paranoid
  // let data = await Employee.findAll({
    // where:{
    //   id:{
    //     [Op.gt]:0
    //   }
    // },
    // paranoid:false
  // });

  // delete
  // let data = await Employee.destroy({
  //   where:{
  //     id:2
  //   }
  // });

  // restore
  // let data = await Employee.restore({
  //     where:{
  //       id:2
  //     }
  //   });

  resp.status(200).json(data);
}

  // delete
  var deleteData = async (req, resp) => {
  let data = await Employee.destroy({
    where:{
      id:2
    }
  });
  resp.status(200).json(data);
}

// restore
  var restoredata = async (req, resp) => {
  let data = await Employee.restore({
      where:{
        id:2
      }
    });
  resp.status(200).json(data);
}

var transactions = async (req, resp) => {
  // let data = 'transactions';
  const t = await db.sequelize.transaction();
  // const t = await db.sequelize.transaction();
  // try {
  //   const user = await Users.create({name: 'Raja', email: 'raja@gmail.com', gender: 'male'}, {
  //     transaction:t
  //   });
  //   console.log('commit');
  //   t.commit();
  // } catch(e) {
  //   console.log('rollback');
  //   t.rollback();
  // }
  let data = await Users.findAll({
    // transaction: t,
    // lock:true
  })
  resp.status(200).json(data);
}

var hooks = async (req, resp) => {
  let data = await Users.create({name:'last data', email:'follow4@gmail.com', gender:'male'});
  resp.status(200).json(data);
}

const queryInterface = db.sequelize.getQueryInterface();
var queryInterfaceData = async (req, resp) => {
  // queryInterface.createTable('avon', {
  //   name: DataTypes.STRING
  // });

  // column add
  // queryInterface.addColumn('avon', 'email', {
  //   type: DataTypes.STRING
  // });

  // alter
  // queryInterface.changeColumn('avon', 'email', {
  //   type: DataTypes.STRING,
  //   defaultValue: 'test@gmail.com'
  // });

  // column delete
  // queryInterface.removeColumn('avon', 'email');

  // delete table
  queryInterface.dropTable('avon');

  let data = 'QI'
  resp.status(200).json(data);
}

module.exports = {
  addUser,
  crudOperation,
  queryData,
  finderData,
  setterGetter,
  validationCont,
  rawQuery,
  oneToOne,
  belongsTo,
  oneToMany,
  manyToMany,
  scopes,
  polymorphic,
  polymorphicMany,
  loading,
  paranoid,
  restoredata,
  deleteData,
  transactions,
  hooks,
  queryInterfaceData
};
const Sequelize = require('sequelize');
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-departments', {logging: false});

//const User = require('./model/user');
//const Department = require('./model/department.js');

const User = db.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    }
  }
});

const Department = db.define('department', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

User.belongsTo(Department);

const syncAndSeed = async()=> {
  try{
    await db.sync({ force: true });
    await [{name: 'testUser'}, {name: 'Jerk Butt'}, {name: 'Phil Free'}].map((u)=> {
      console.log(u);
      User.create(u);
    });
    await [{name:'unproductive'}, {name: 'useless'}, {name: 'fireproof'}].map((d)=>{
      console.log(d);
      Department.create(d);
    });
  }
  catch(e){
    console.log(e);
  }
};

syncAndSeed();

module.exports = {User, Department, db, syncAndSeed};

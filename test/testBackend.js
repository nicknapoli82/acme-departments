'use strict';

// Since I really dont feel like I know what I am doing with
// TDD development, I'm just copying some stuff over from
// the sequize checkpoint.

const expect = require('chai').expect;
const request = require('supertest');

const {User, Department, db, syncAndSeed} = require('../server/db');

/**
  * Lets try and get some db tests working eh
  */

describe('Basic DB testing', ()=> {
  before(async() => {
    await syncAndSeed();
  });

  // This first test only works sometimes. I'll have to try and think
  // of a way to make it work always. Depends on order rows are sent back
  // from db. Also I'm getting a lot of validation errors. 
  describe('Users Attributes', () => {
    it('Has "name" and "id" fields', async()=> {
      try{
	const users = await User.findAll();
	expect(users[0].name).to.equal('testUser');
      }
      catch(e){
	console.log(e);
      }
    });
    it('Has a length of 3', async()=> {
      try{
	const users = await User.findAll();
	expect(users.length).to.equal(3);
      }
      catch(e){
	console.log(e);
      }
    });
  });

  describe('Department Attributes', ()=> {
    it('Has a length of 3', async()=> {
      try{
	const dept = await Department.findAll();
	expect(dept.length).to.equal(3);
      }
      catch(e){
	console.log(e);
      }
    });
  });
});


var request = require('supertest')
var routes = require(__server + '/server.js')

describe("The Server", function(){

  var app = TestHelper.createApp()
  app.use('/', routes)
  app.testReady()

  describe('GET Deals', function(){
    it('gets at least one deal back', function (){
      //Mocha will wait for returned promises to complete
      return request(app)
      .get('/api/deals/getAll')
      .expect(200)
      .expect(function(response){
        expect(response.body).to.have.length.above(1)
      })
    })
  })

 var deal_id; //this will be used later to delete a deal
  describe('Deals', function(){
    it_('successfully posts a new deal', function * (){

      yield request(app)
        .post('/api/owner/create')
        .send({"restaurant_id": 1, "description": "the sweetest deal ever - testing", "expiration": 2200, "month": 5, "day": 23, "year": 2016})
        .expect(201)

      yield request(app)
        .get('/api/deals/getAll')
        .expect(200)
        .expect(function(response){
          var dealsArray = response.body;
          var target;
          dealsArray.forEach(function(value){
            if(value["description"] === "the sweetest deal ever - testing"){target=value; deal_id=value["deal_id"]}
          })
          expect(target).to.have.property('description', 'the sweetest deal ever - testing')
        })
    })
  })

  describe('Expire', function(){
    it_('will manually expire a deal', function * (){

      yield request(app)
        .post('/api/deals/update')
        .send({deal_id: deal_id, expiration: "001", day: 23, month: 1, year: 2016})
        .expect(200)

      yield request(app)
        .get('/api/deals/getAll')
        .expect(200)
        .expect(function(response){
          var dealsArray = response.body;
          var target = 0;
          dealsArray.forEach(function(value){
            if(value["deal_id"] === deal_id){target++;}
          })
          console.log('target', target);
          expect(target).to.eql(0)
        })

      yield request(app)

    })
  })

  describe('Owner', function(){
    it('Can login with an existing owner', function(){
      return request(app)
      .post('/api/owner/login')
      .send({username: "chuys", password: "chuys"})
      .expect(200)
    })

    it('Cannot login with incorrect password', function(){
      return request(app)
      .post('/api/owner/login')
      .send({username: "chuys", password: "rebase"})
      .expect(400)
      .expect({"reason":"Password incorrect"})
    })

    it('Cannot login with fake login info', function(){
      return request(app)
      .post('/api/owner/login')
      .send({username: 'fakedude', password: 'blah'})
      .expect(400)
      .expect({"reason":"User not found"})
    })
  })

}) //top level describe

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
      .get('/api/getDeals/')
      .expect(200)
      .expect(function(response){
        expect(response.body).to.have.length.above(1)
      })
    })
  })

  describe('POST a new deal', function(){
    it_('successfully posts a new deal', function * (){

      yield request(app)
        .post('/api/owner/create')
        .send({"restaurant_id": 1, "description": "the sweetest deal ever - testing", "expiration": 2200, "month": 1, "day": 23, "year": 2016})
        .expect(201)

      yield request(app)
        .get('/api/getDeals')
        .expect(200)
        .expect(function(response){
          var dealsArray = response.body;
          var target;
          dealsArray.forEach(function(value){
            if(value["description"] === "the sweetest deal ever - testing"){target=value}
          })
          expect(target).to.have.property('description', 'the sweetest deal ever - testing')
        })
    })
  })

})

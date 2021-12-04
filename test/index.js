process.env.NODE_ENV = 'test';
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('BMI', () => {
    describe('/GET BMI data', () => {
        it('it should GET BMI data with added 3 cloumns', (done) => {
            chai.request(server)
                .get('/bmi')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('BMIdata');
                    res.body.BMIdata.should.be.a('array');
                    res.body.BMIdata[0].should.have.property('BMI');
                    res.body.BMIdata[0].should.have.property('BMICategory');
                    res.body.BMIdata[0].should.have.property('HealthRisk');
                    done();
                });
        });
    });

    describe('/GET category count', () => {
        it('it should GET count of overweight category', (done) => {
            chai.request(server)
                .get('/bmi/Overweight/count')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('count');
                    res.body.should.have.property('category');
                    res.body.count.should.be.a('number');
                    res.body.should.have.property('category').eql('Overweight');
                    done();
                });
        });
    });

});
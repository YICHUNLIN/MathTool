const should = require('should')
require('../extensions')
const MArea = require('../lib/math');
describe("test MArea", function(){
    
    it("check MArea function _findSlot slot and limit 1 0", function(done){
        const marea = new MArea()
        const data = [{x: 0.0, y: 3.0}, {x: 3.0, y: 3.0}]
        const {slot, limit} = marea._findSlot(data)
        slot.should.equal(1)
        limit.should.equal(0)
        done()
    })

    it("check MArea function _findSlot slot and limit 1 0", function(done){
        const marea = new MArea()
        const data = [{x: 0.1, y: 3.0}, {x: 3.0, y: 3.0}]
        const {slot, limit} = marea._findSlot(data)
        slot.should.equal(0.1)
        limit.should.equal(1)
        done()
    })


    it("check MArea function _findSlot slot and limit 0.01 2", function(done){
        const marea = new MArea()
        const data = [{x: 0.01, y: 3.0}, {x: 3.0, y: 3.0}]
        const {slot, limit} = marea._findSlot(data)
        slot.should.equal(0.01)
        limit.should.equal(2)
        done()
    })


    it("check MArea function _findSlot slot and limit 0.001 2", function(done){
        const marea = new MArea()
        const data = [{x: 0.01, y: 3.1}, {x: 3.0, y: 3.02}]
        const {slot, limit} = marea._findSlot(data)
        slot.should.equal(0.01)
        limit.should.equal(2)
        done()
    })

    it("check MArea function det", function(done){
        const marea = new MArea()
        const data = [
            {"x": 0.0, "y": 0.0},
            {"x": 3.0, "y": 0.0},
            {"x": 3.0, "y": 3.0},
            {"x": 0.0, "y": 3.0}]
        const r = marea.det(data)
        r.should.equal(9)
        done()
    })


    it("check MArea function integral", function(done){
        const marea = new MArea()    
        const data1 = [
            {"x": 0.0, "y": 0.0},
            {"x": 3.0, "y": 0.0}
        ]
        const data2 = [
            {"x": 0.0, "y": 3.0},
            {"x": 3.1, "y": 3.0}
        ]
        const r = marea.integral(data1, data2)
        r.should.equal(9.3)
        done()
    })
    
})
const assert = require('assert')
const cal = require("../app/calculator")
describe('Validating the calculator  for add ', ()=>{
    it('add(5, 2) expected result 7 PASS ' , ()=>{
        assert.equal(cal.add(5,2),7)
    })
    it('add(5, 2) expected result 8 Fail ' , ()=>{
        assert.equal(cal.add(5,2),8)
    })
})

describe('Validating the calculator  for Sub ', ()=>{
    it('sub(5, 2) expected result 3 PASS' , ()=>{
        assert.equal(cal.sub(5,2),3)
    })
    it('sub(5,2) expected result 5 FAIL ' , ()=>{
        assert.equal(cal.sub(5,2),5)
    })
})



describe('Validating the calculator  for Mul ', ()=>{
    it('mul(5, 2) expected result 10 PASS' , ()=>{
        assert.equal(cal.mul(5,2),10)
    })
    it('mul(5,2) expected result 12 FAIL ' , ()=>{
        assert.equal(cal.mul(5,2),12)
    })
})

describe('Validating the calculator  for Div ', ()=>{
    it('div(5, 2) expected result 5 PASS' , ()=>{
        assert.equal(cal.div(10,2),5)
    })
    it('div(5,2) expected result 2 FAIL ' , ()=>{
        assert.equal(cal.div(10,2),12)
    })
})
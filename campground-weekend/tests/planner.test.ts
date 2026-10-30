import {test} from 'node:test';import assert from 'node:assert/strict';import {estimate,type Costs} from '../src/lib/planner.ts';
const base:Costs={nights:2,people:4,lodging:0,rental:0,delivery:0,transport:0,fees:0,gear:0,food:0,taxRate:0};
test('tent weekend uses nightly party and per-person food costs',()=>{const c=estimate({...base,lodging:35,food:15,transport:45,fees:20});assert.equal(c.total,255);assert.equal(c.perPerson,63.75);});
test('rented RV includes delivery once and taxes defined subtotal',()=>{const c=estimate({...base,lodging:45,rental:160,delivery:150,fees:50,taxRate:5});assert.equal(c.subtotal,610);assert.equal(c.total,640.5);assert.equal(c.perPerson,160.125);});
test('cabin cost is per party, not multiplied by people',()=>{assert.equal(estimate({...base,lodging:150}).total,300);});
test('zero optional costs',()=>assert.equal(estimate(base).total,0));
test('reject invalid, missing and fractional count inputs',()=>{for(const change of [{nights:0},{people:0},{nights:1.5},{people:-2},{lodging:NaN},{food:Infinity},{fees:-1},{taxRate:101}])assert.throws(()=>estimate({...base,...change}));});

import React from "react";
import test from "ava";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";
import sinon from "sinon";

chai.use( chaiEnzyme );

import NewToDo from "./NewToDo";

test( "NewToDo calls props.submit on form submition", () => {
  const submitSpy = sinon.spy();

  const newToDo = shallow(
    <NewToDo submit={ submitSpy } />
  );

  newToDo
    .find( '.new-to-do' )
    .simulate('submit', { preventDefault() {} });

    sinon.assert.calledOnce( submitSpy )
});

test( "NewToDo calls handleChange on input change", () => {

  const newToDo = shallow(
    <NewToDo submit={ () => null } />
  );

  newToDo
    .find( '.new-to-do__input' )
    .simulate('change', { target: { value: 'test' } });

  expect( newToDo.state().toDo ).to.eql('test');

});

import React from "react";
import test from "ava";
import { shallow } from "enzyme";
import chai, { expect } from "chai";
import chaiEnzyme from "chai-enzyme";

chai.use( chaiEnzyme );

import List from "./List";

test( "List removes item from toDos when deleteToDo is called", () => {
  const list = shallow(
    <List />
  );

  list.setState({toDos: [{ text: 'thing1', complete: false }, { text: 'thing2', complete: false }]});

  list.instance().deleteToDo({text: 'thing2'});

  expect( list.state().toDos.length ).to.eql(1);
});

test( "List does not remove incorrect item from toDos when deleteToDo is called", () => {
  const list = shallow(
    <List />
  );

  list.setState({toDos: [{ text: 'thing1' }, { text: 'thing2' }]});

  list.instance().deleteToDo({text: 'thing3'});

  expect( list.state().toDos.length ).to.eql(2);
});

test( "List adds items to toDos", () => {
  const list = shallow(
    <List />
  );

  list.instance().submitToDo('thing1');

  expect( list.state().toDos.length ).to.eql(1);
  expect( list.state().toDos[0] ).to.eql({text: 'thing1', complete: false});
});

test( "List toggles matching toDos complete value", () => {
  const list = shallow(
    <List />
  );

  list.setState({toDos: [{ text: 'thing1', complete: false }, { text: 'thing2', complete: false }]});

  list.instance().toggleCompletion({text: 'thing2'});

  expect( list.state().toDos ).to.eql([{ text: 'thing1', complete: false }, { text: 'thing2', complete: true }]);

  list.instance().toggleCompletion({text: 'thing2'});

  expect( list.state().toDos ).to.eql([{ text: 'thing1', complete: false }, { text: 'thing2', complete: false }]);
});

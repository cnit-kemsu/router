import React, { createElement } from 'react';
import ReactDOM from 'react-dom';
import { Router } from './classes/router';
import { useRouting } from './hooks/use-routing';

function handleChange() {
  console.log(Router.state);
  console.log(Router.pathname);
  console.log(Router.search);
}
Router.changeEvent.subscribe(handleChange);

function Comp1({ id }) {
  return (
    <div>
      <div>
        Comp1
      </div>
      <div>
        id: {id}
      </div>
    </div>
  );
}

function Comp2({ id }) {
  return (
    <div>
      <div>
        Comp2
      </div>
      <div>
        id: {id}
      </div>
    </div>
  );
}

function Comp3() {
  return (
    <div>
      <div>
        Comp3
      </div>
    </div>
  );
}

function routes() {
  return {
    '/comp1/:id': Comp1,
    '/comp2/:idd': Comp2,
    '/': Comp3
  };
}

function App() {

  console.log('render App');

  const routing = useRouting(routes);

  return (
    <div>
      <div>
        <button onClick={() => Router.push({ pathname: '/comp1/2', state: { a: 'title 1' } })}>title 1</button>
        <button onClick={() => Router.push({ pathname: '/comp2/-1', search: { id: 5 }, state: { b: 'title 2' } })}>title 2</button>
        <button onClick={() => Router.push({ pathname: Router.pathname, search: { order: ['firstname', 'lastname'], filter: { name: 'John' } }, state: { c: 'title 3' } })}>title 3</button>
        <button onClick={() => Router.push({ pathname: '' })}>title 4</button>
      </div>
      <div>
        {routing}
      </div>
    </div>
  );
}

const root = () => (
  <App />
);

ReactDOM.render(
  createElement(root),
  document.getElementById('root')
);

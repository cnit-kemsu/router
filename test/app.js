import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '../src/classes/Router';
import { useRouting } from '../src/hooks/useRouting';

function Component1({ id }) {
  return (
    <div style={{ border: '1px solid black' }}>
      <div>
        Component1
      </div>
      <div>
        param "id": {id}
      </div>
      <div>
        state: {JSON.stringify(Router.state)}
      </div>
      <div>
        search: {JSON.stringify(Router.search)}
      </div>
    </div>
  );
}

function Component2({ id }) {
  return (
    <div style={{ border: '1px solid black' }}>
      <div>
        Component2
      </div>
      <div>
        param "id": {id}
      </div>
      <div>
        state: {JSON.stringify(Router.state)}
      </div>
      <div>
        search: {JSON.stringify(Router.search)}
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div style={{ border: '1px solid black' }}>
      <div>
        Component3
      </div>
      <div>
        state: {JSON.stringify(Router.state)}
      </div>
      <div>
        search: {JSON.stringify(Router.search)}
      </div>
    </div>
  );
}

function routes() {
  return {
    '/route1/:id': Component1,
    '/route1/subroute1/:id': Component2,
    '/': Component3
  };
}

function App() {

  const routing = useRouting(routes);

  return (
    <div>
      <div>
        <button onClick={() => Router.push({ pathname: '/route1/10', state: { message: 'Hello!' } })}>Component 1</button>
        <button onClick={() => Router.push({ pathname: '/route1/subroute1/22', search: { page: 5 }, state: { message: 'Hello again!' } })}>Component 1</button>
        <button onClick={() => Router.push({ pathname: Router.pathname, search: { order: ['firstname', 'lastname'], filter: { name: 'John' } } })}>Change search</button>
        <button onClick={() => Router.push({ pathname: '' })}>Component 3</button>
      </div>
      <div style={{ maxWidth: '400px' }}>
        {routing}
      </div>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

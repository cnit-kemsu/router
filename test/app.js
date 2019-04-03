import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '../src/classes/Router';
import { useRouting } from '../src/hooks/useRouting';

function Subcomp1() {
  return (
    <div style={{ border: '1px solid blue' }}>
      <div>
        Subcomp1
      </div>
    </div>
  );
}

function Subcomp2() {
  return (
    <div style={{ border: '1px solid blue' }}>
      <div>
        Subcomp2
      </div>
    </div>
  );
}

function subroutes(match) {
  return {
    [match + '/subroute1']: Subcomp1,
    [match + '/subroute2']: Subcomp2
  };
}

function Component1({ match, id }) {
  const routing = useRouting(subroutes, match);
  return (
    <div style={{ border: '1px solid black' }}>
      <div>
        Component1
      </div>
      <div>
        match: {match}
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
      <div>
        <div>subroutes</div>
        <div>
          {routing}
        </div>
      </div>
    </div>
  );
}

function Component2({ match, id }) {
  return (
    <div style={{ border: '1px solid black' }}>
      <div>
        Component2
      </div>
      <div>
        match: {match}
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

function Component3({ match }) {
  return (
    <div style={{ border: '1px solid black' }}>
      <div>
        Component3
      </div>
      <div>
        match: {match}
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
    '/route1/:id/*': Component1,
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
        <button onClick={() => Router.push({ pathname: '/route1/10/subroute1', state: { message: 'Hello!' } })}>Component 1 -> Subcomp1</button>
        <button onClick={() => Router.push({ pathname: '/route1/10/subroute2', state: { message: 'Hello!' } })}>Component 1 -> Subcomp2</button>
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

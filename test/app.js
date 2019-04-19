import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '../src/classes/Router';
import { useRouting } from '../src/hooks/useRouting';

function Subcomp1() {
  console.log('render subcomp1');
  return (
    <div style={{ border: '1px solid blue' }}>
      <div>
        Subcomp1
      </div>
    </div>
  );
}

function Subcomp2() {
  console.log('render subcomp2');
  return (
    <div style={{ border: '1px solid blue' }}>
      <div>
        Subcomp2
      </div>
    </div>
  );
}

const subroutes = {
  '/(?<id>\\w+)/subroute1$': props => <Subcomp1 {...props} />,
  '/subroute2$': props => <Subcomp2 {...props} />
};

function Component1({ id }) {
  console.log('render comp1');
  const routing = useRouting(subroutes);
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
      <div>
        <div>subroutes</div>
        <div>
          {routing}
        </div>
      </div>
    </div>
  );
}

function Component2({ id }) {
  console.log('render comp2');
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
  console.log('render comp3');
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

const routes = {
  '/route1/(?<id>\\d+)': props => <Component1 {...props} />,
  '/route1/subroute1/(?<id>\\w*)': props => <Component2 {...props} />,
  '^/$': props => <Component3 {...props} />
};

function App() {

  console.log('render app');
  const routing = useRouting(routes);

  return (
    <div>
      <div>
        <button onClick={() => Router.push({ pathname: '/route1/10', state: { message: 'Hello!' } })}>Component 1</button>
        <button onClick={() => Router.push({ pathname: '/route1/10/subroute1', state: { message: 'Hello!' } })}>Component 1 -> Subcomp1</button>
        <button onClick={() => Router.push({ pathname: '/route1/20/subroute1', state: { message: 'Hello!' } })}>Component 1 -> Subcomp1 - 20</button>
        <button onClick={() => Router.push({ pathname: '/route1/10/subroute2', state: { message: 'Hello!' } })}>Component 1 -> Subcomp2</button>
        <button onClick={() => Router.push({ pathname: '/route1/20/subroute2', state: { message: 'Hello!' } })}>Component 1 -> Subcomp2 - 20</button>
        <button onClick={() => Router.push({ pathname: '/route1/subroute1/22', search: { page: 5 }, state: { message: 'Hello again!' } })}>Component 2</button>
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
  <App/>,
  document.getElementById('root')
);

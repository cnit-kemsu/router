import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from '../src/classes/Router';
import { useRoute } from '../src/hooks/useRoute';
import { useDefaultRoute } from '../src/hooks/useDefaultRoute';

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

function Component1({ id }) {
  console.log('render comp1');
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
          {useRoute('/(?<id>\\w+)/subroute1$', props => <Subcomp1 {...props} />)}
          {useRoute('/subroute2$', props => <Subcomp2 {...props} />)}
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

function App() {

  console.log('render app');

  return (
    <div>
      <div>
        <button onClick={() => Router.push('/route1/10', { message: 'Hello!' }, 'Component 1' )}>Component 1</button>
        <button onClick={() => Router.push('/route1/10/subroute1', { message: 'Hello!' })}>Component 1 -> Subcomp1</button>
        <button onClick={() => Router.push('/route1/20/subroute1', { message: 'Hello!' })}>Component 1 -> Subcomp1 - 20</button>
        <button onClick={() => Router.push('/route1/10/subroute2', { message: 'Hello!' })}>Component 1 -> Subcomp2</button>
        <button onClick={() => Router.push('/route1/20/subroute2', { message: 'Hello!' })}>Component 1 -> Subcomp2 - 20</button>
        <button onClick={() => Router.push('/route1/subroute1/22', { page: 5 }, { message: 'Hello again!' })}>Component 2</button>
        <button onClick={() => Router.push(Router.path, { order: ['firstname', 'lastname'], filter: { name: 'John' } })}>Change search</button>
        <button onClick={() => Router.push('')}>Component 3</button>
        <button onClick={() => Router.push('/notfound')}>To Not Found</button>
      </div>
      <div style={{ maxWidth: '400px' }}>
        {useRoute('/route1/(?<id>\\d+)', props => <Component1 {...props} />)}
        {useRoute('/route1/subroute1/?(?<id>\\w+)?', props => <Component2 {...props} />)}
        {useRoute('^/$', props => <Component3 {...props} />)}
        {useDefaultRoute(() => <div>Page not found</div>)}
      </div>
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

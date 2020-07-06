import React from 'react';
import ReactDOM from 'react-dom';
import { History } from '../src/classes/History';
import { Location } from '../src/classes/Location';
import { useRoute } from '../src/hooks/useRoute';
import { useRoutes } from '../src/hooks/useRoutes';

const boxPadding = '4px';

function SubContent1() {
  console.log('render SubContent1');
  return (
    <div style={{ border: '1px solid blue', padding: boxPadding }}>
      Sub Content 1
    </div>
  );
}

function SubContent2() {
  console.log('render SubContent2');
  return (
    <div style={{ border: '1px solid red', padding: boxPadding }}>
      Sub Content 2
    </div>
  );
}

function Content1({ id }) {
  console.log('render Content1');
  return (
    <div style={{ border: '1px solid black', padding: boxPadding }}>
      <div>
        Content 1
      </div>
      <div>
        param "id": {id}
      </div>
      <div>
        state: {JSON.stringify(Location.state)}
      </div>
      <div>
        search: {JSON.stringify(Location.search)}
      </div>
      <div>
        <div>subroutes</div>
        <div>
          {useRoute('/(?<id>\\w+)/subcontent1$', props => <SubContent1 {...props} />)}
          {useRoute('/subcontent2$', props => <SubContent2 {...props} />)}
        </div>
      </div>
    </div>
  );
}

function Content2({ id }) {
  console.log('render Content2');
  return (
    <div style={{ border: '1px solid green', padding: boxPadding }}>
      <div>
        Content 2
      </div>
      <div>
        param "id": {id}
      </div>
      <div>
        state: {JSON.stringify(Location.state)}
      </div>
      <div>
        search: {JSON.stringify(Location.search)}
      </div>
    </div>
  );
}

function Content3() {
  console.log('render Content2');
  return (
    <div style={{ border: '1px solid orange' }}>
      <div>
        Content 3
      </div>
      <div>
        state: {JSON.stringify(Location.state)}
      </div>
      <div>
        search: {JSON.stringify(Location.search)}
      </div>
    </div>
  );
}

const routes = [
  ['/main/(?<id>\\d+)', props => <Content1 {...props} />],
  [/\/main\/content2\/?(?<id>\w+)?/, props => <Content2 {...props} />],
  [/^\/$/, props => <Content3 {...props} />]
];

function App() {

  console.log('render App');

  return (
    <>
      <div>
        <button onClick={() => History.push('/main/10', { message: 'Hello!' }, 'Content 1' )}>Content 1</button><br/>
        <button onClick={() => History.push('/main/10/subcontent1', { message: 'Hello!' })}>Content 1 -> SubContent 1</button><br/>
        <button onClick={() => History.push('/main/20/subcontent1', { message: 'Hello!' })}>Content 1 -> SubContent 1 (id: 20)</button><br/>
        <button onClick={() => History.push('/main/10/subcontent2', { message: 'Hello!' })}>Content 1 -> SubContent 2</button><br/>
        <button onClick={() => History.push('/main/20/subcontent2', { message: 'Hello!' })}>Content 1 -> SubContent 2 (id: 20)</button><br/>
        <button onClick={() => History.push('/main/content2/22', { page: 5 }, { message: 'Hello again!' })}>Content 2</button><br/>
        <button onClick={() => History.push(Location.path, { order: ['firstname', 'lastname'], filter: { name: 'John' } })}>Change search</button><br/>
        <button onClick={() => History.push('')}>Content 3</button><br/>
        <button onClick={() => History.push('/notfound')}>To Not Found</button><br/>
      </div>
      <br/>
      <div style={{ maxWidth: '400px', padding: boxPadding }}>
        {useRoutes(routes) || <div>Page no found</div>}
      </div>
    </>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);

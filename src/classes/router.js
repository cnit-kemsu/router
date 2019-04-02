import { Publisher } from '@kemsu/publisher';
import { QS } from './qs';

function mapValues({ state, title, pathname, search }) {

  Router.search = search;
  const _pathname = pathname || '/';
  Router.currentRoute = _pathname.split('/');

  return [
    state,
    title,
    _pathname + QS.stringify(search)
  ];
}

export class Router {
  static changeEvent = new Publisher();

  static get state() {
    return history.state;
  }
  static get pathname() {
    return location.pathname;
  }
  static search = QS.parse(location.search);
  static currentRoute = location.pathname.split('/');

  static push(values) {
    history.pushState(
      ...mapValues(values)
    );
    Router.changeEvent.publish();
  }

  static replace(values) {
    history.replaceState(
      ...mapValues(values)
    );
    Router.changeEvent.publish();
  }
}

function handlePopstate() {
  Router.search = QS.parse(location.search);
  Router.currentRoute = Router.pathname.split('/');
  Router.changeEvent.publish();
}

addEventListener('popstate', handlePopstate);
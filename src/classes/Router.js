import { Publisher } from '@kemsu/publisher';
import { QS } from './qs';
import { clearMatches } from '../routing';

export class Router {
  static updateEvent = new Publisher();

  static get state() {
    return history.state;
  }
  static get path() {
    return location.pathname;
  }
  static search = QS.parse(location.search);

  static push(path, search, data) {
    Router.search = search;
    history.pushState(data, undefined, (path || '/') + QS.stringify(search));
    clearMatches();
    Router.updateEvent.publish();
  }

  static replace(path, search, data) {
    Router.search = search;
    history.replaceState(data, undefined, (path || '/') + QS.stringify(search));
    clearMatches();
    Router.updateEvent.publish();
  }
}

function handlePopstate() {
  Router.search = QS.parse(location.search);
  Router.updateEvent.publish();
}

addEventListener('popstate', handlePopstate);
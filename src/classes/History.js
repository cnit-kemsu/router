import { Publisher } from '@kemsu/publisher';
import { Location } from './Location';
import { QS } from './qs';

export class History {
  static updateEvent = new Publisher();

  static get state() {
    return history.state;
  }

  static _historyStack = [];
  static currentStateId = 0;

  static _beforeRoute = null;
  static beforeRoute() {
    if (History._beforeRoute) History._beforeRoute();
  }
  static setBeforeRoute(value) {
    if (value) History._beforeRoute = value;
  }

  static getPreviousState() {
    return History._historyStack[History.currentStateId - 1];
  }

  static push(path, search = {}, data) {

    History.beforeRoute();
    History._historyStack.push({
      state: History.state,
      path: Location.path,
      search: Location.search,
      stackId: History.currentStateId
    });

    Location.search = search;
    History.currentStateId++;
    history.pushState(data, document.title, (path || '/') + QS.stringify(search));
    History.updateEvent.publish();
  }

  static update(path, search = {}, data) {
    Location.search = search;
    history.replaceState(data, document.title, (path || '/') + QS.stringify(search));
    History.updateEvent.publish();
  }

  static replace(path, search = {}, data) {
    Location.search = search;
    history.replaceState(data, document.title, (path || '/') + QS.stringify(search));
  }
}

function handlePopstate(event) {
  Location.search = QS.parse(location.search);
  History.updateEvent.publish();
}

addEventListener('popstate', handlePopstate);
import { Publisher } from '@kemsu/publisher';
import { Location } from './Location';
import { QS } from './qs';

export class History {
  static updateEvent = new Publisher();

  static get state() {
    return history.state;
  }

  static push(path, search = {}, data) {
    Location.search = search;
    history.pushState(data, undefined, (path || '/') + QS.stringify(search));
    History.updateEvent.publish();
  }

  static update(path, search = {}, data) {
    Location.search = search;
    history.replaceState(data, undefined, (path || '/') + QS.stringify(search));
    History.updateEvent.publish();
  }

  static replace(path, search = {}, data) {
    Location.search = search;
    history.replaceState(data, undefined, (path || '/') + QS.stringify(search));
  }
}

function handlePopstate() {
  Location.search = QS.parse(location.search);
  History.updateEvent.publish();
}

addEventListener('popstate', handlePopstate);
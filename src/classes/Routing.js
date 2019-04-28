import { History } from './History';
import { Location } from './Location';

function toRegExp([path, output]) {
  return [
    typeof path === 'string' ? new RegExp(path) : path,
    output
  ];
}

export class Routing {

  constructor(forceUpdate, routes) {
    this.forceUpdate = forceUpdate;
    this.routes = routes.map(toRegExp);

    this.handleUpdate = this.handleUpdate.bind(this);
    this.unsubscribeFromUpdateEvent = this.unsubscribeFromUpdateEvent.bind(this);
    this.handleUpdateEventSubscription = this.handleUpdateEventSubscription.bind(this);
  }

  matching(path) {
    for (const [matching, output] of this.routes) {
      const result = matching.exec(path);
      if (result !== null) return [
        result,
        output
      ];
    }
  }

  test() {
    const { pathname, search } = location;
    if (this.result === undefined) {
      if (this.path === pathname) return false;
    } else if (this.path === pathname
      && this.search === search) return false;
    this.path = pathname;

    const [{ 0: match, groups: params }, output] = this.matching(pathname) || [{},];
    if (this.match === match && this.search === search) return false;
    this.match = match;
    this.search = search;

    if (match === undefined) this.result = undefined;
    else {
      const props = { ...params, ...Location.search };
      if (output === undefined) this.result = props;
      else this.result = typeof output === 'function'
        ? output(props)
        : output;
    }

    return true;
  }

  handleUpdate() {
    if (this.test()) this.forceUpdate();
  }

  subscribeToUpdateEvent() {
    this.updateSub = History.updateEvent.subscribe(this.handleUpdate);
  }

  unsubscribeFromUpdateEvent() {
    this.updateSub.unsubscribe();
  }

  handleUpdateEventSubscription() {
    this.subscribeToUpdateEvent();
    return this.unsubscribeFromUpdateEvent;
  }
}
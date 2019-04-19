import { Router } from "./Router";

export class Route {

  constructor(forceUpdate, path, output) {
    this.forceUpdate = forceUpdate;
    this.matchtest = new RegExp(path);
    this.output = output;

    this.test();

    this.handleUpdate = this.handleUpdate.bind(this);
    this.unsubscribeFromUpdateEvent = this.unsubscribeFromUpdateEvent.bind(this);
    this.handleUpdateEventSubscription = this.handleUpdateEventSubscription.bind(this);
  }

  test() {
    const { 0: match, groups } = this.matchtest.exec(Router.path) || {};
    if (this.match === match) return false;
    this.match = match;
    this.params = groups;
    return true;
  }

  result() {
    if (this.match === undefined) return undefined;
    return typeof this.output === 'function'
      ? this.output(this.params)
      : this.output;
  }

  handleUpdate() {
    if (this.test()) this.forceUpdate();
  }

  subscribeToUpdateEvent() {
    this.updateSub = Router.updateEvent.subscribe(this.handleUpdate);
  }

  unsubscribeFromUpdateEvent() {
    this.updateSub.unsubscribe();
  }

  handleUpdateEventSubscription() {
    this.subscribeToUpdateEvent();
    return this.unsubscribeFromUpdateEvent;
  }
}
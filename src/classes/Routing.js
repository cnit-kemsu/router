import React from 'react';
import { Publisher } from '@kemsu/publisher';
import { Router } from "./Router";
//import { Subrouter } from '../comps/Subrouter';

function toElement(component, params) {
  if (typeof component === 'function') return component(params);
  return component;
}

function mapToRegExp([path, component]) {
  return {
    path: new RegExp(path),
    component
  };
}
function pathExec({ path }) {
  return path.exec(Router.pathname);
}
function nonNull(value) {
  return value !== null;
}
function mapToElement(route) {
  return route.element;
}

export class Routing {
  updateEvent = new Publisher();

  constructor(/*router = Router, */forceUpdate, routes) {
    //this.router = router;
    this.forceUpdate = forceUpdate;
    this.routes = Object.entries(routes).map(mapToRegExp);

    this.routing = [];
    this.refreshRouting();

    this.handleUpdate = this.handleUpdate.bind(this);
    this.unsubscribeFromEvents = this.unsubscribeFromEvents.bind(this);
    this.handleSubscriptions = this.handleSubscriptions.bind(this);
  }

  render() {
    // return React.createElement(Subrouter, {
    //   routing: this,
    //   children: this.routing.filter(nonNull).map(mapToElement)
    // });
    return this.routing.filter(nonNull).map(mapToElement);
  }

  refreshRouting() {
    const routing = this.routes.map(pathExec);

    let shouldUpdate = false;
    for (let index = 0; index < routing.length; index++) {

      if (routing[index]?.[0] !== this.routing[index]?.match) {

        this.routing[index] = routing[index] === null ? null : {
          match: routing[index]?.[0],
          element: toElement(this.routes[index].component, routing[index].groups)
          // element: React.createElement(this.routes[index].component, {
          //   key: 'route-' + index,
          //   ...routing[index].groups
          // })
        };
        shouldUpdate = true;
      }
    }

    return shouldUpdate;
  }

  handleUpdate() {
    if (this.refreshRouting()) this.forceUpdate();
    else this.updateEvent.publish();
  }

  subscribeToEvents() {
    //this.updateSub = this.router.updateEvent.subscribe(this.handleUpdate);
    this.updateSub = Router.updateEvent.subscribe(this.handleUpdate);
  }

  unsubscribeFromEvents() {
    this.updateSub.unsubscribe();
  }

  handleSubscriptions() {
    this.subscribeToEvents();
    return this.unsubscribeFromEvents;
  }
}
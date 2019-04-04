import { /*useContext, */useMemo, useEffect } from 'react';
import { useForceUpdate } from '@kemsu/force-update';
import { Routing } from '../classes/Routing';
//import { RouterContext } from '../comps/Subrouter';

export function useRouting(routes) {

  //const router = useContext(RouterContext);
  const forceUpdate = useForceUpdate();
  const routing = (() => new Routing(/*router, */forceUpdate, routes)) |> useMemo(#, []);

  useEffect(routing.handleSubscriptions, []);

  return routing.render();
}

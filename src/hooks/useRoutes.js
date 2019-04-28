import { useMemo, useEffect } from 'react';
import { useForceUpdate } from '@kemsu/force-update';
import { Routing } from '../classes/Routing';

export function useRoutes(routes) {

  const forceUpdate = useForceUpdate();
  const routing = (() => new Routing(forceUpdate, routes))
  |> useMemo(#, []);

  useEffect(routing.handleUpdateEventSubscription, []);

  routing.test();
  return routing.result;
}

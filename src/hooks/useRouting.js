import { useMemo, useEffect } from 'react';
import { useForceUpdate } from '@implicit/force-update';
import { Routing } from '../classes/Routing';

export function useRouting(routes) {

  const forceUpdate = useForceUpdate();
  const routing = useMemo(() => new Routing(forceUpdate), []);

  useEffect(routing.handleSubscriptions, []);

  return Routing.Route(routes);
}

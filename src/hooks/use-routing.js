import { useMemo, useEffect } from 'react';
import { useForceUpdate } from '@implicit/form';
import { Routing } from '../classes/routing';

export function useRouting(routes) {

  const forceUpdate = useForceUpdate();
  const routing = useMemo(() => new Routing(forceUpdate), []);

  useEffect(routing.handleSubscriptions, []);

  return Routing.Route(routes);
}

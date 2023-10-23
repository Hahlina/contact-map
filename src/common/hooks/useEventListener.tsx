import { useEffect, useCallback } from 'react';

function useEventListener(eventName: string, listener: any) {
  const eventListener = useCallback(
    ({ detail }: { detail: any }) => {
      listener(detail);
    },
    [listener],
  );

  useEffect(() => {
    const eventNames = Array.isArray(eventName) ? eventName : [eventName];

    eventNames.forEach((name) => {
      window.addEventListener(name, eventListener);
    });

    return () => {
      eventNames.forEach((name) => {
        window.removeEventListener(name, eventListener);
      });
    };
  }, [eventName, eventListener]);
}

export default useEventListener;

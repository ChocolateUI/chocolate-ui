import { useEffect, useState, useCallback } from "react";

const useSyncCallback = (callback: () => any) => {

  const [proxyState, setProxyState] = useState({ current: false });

  const func = useCallback(() => {
    setProxyState({ current: true });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proxyState]);

  useEffect(() => {
    if (proxyState.current === true) setProxyState({ current: false });
  }, [proxyState]);

  useEffect(() => {
    proxyState.current && callback();
  });

  return func;
};

export default useSyncCallback;

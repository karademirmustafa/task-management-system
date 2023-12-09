import React, { memo, useMemo, lazy, Suspense } from 'react';

const Layout = () => {
  const AppLayout = useMemo(() => {
    return lazy(() => import('./AuthLayout'));
  }, []);

  return (
    <Suspense
      fallback={
        <div className="flex flex-auto flex-col h-[100vh]">
          {/* <Loading loading={true} /> */}
          <span>Loading...</span>
        </div>
      }>
      <AppLayout />
    </Suspense>
  );
};

export default memo(Layout);

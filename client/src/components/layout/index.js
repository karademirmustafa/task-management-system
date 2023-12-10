import { Loading } from 'components/shared';
import React, { memo, useMemo, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const AppLayout = useMemo(() => {
    return lazy(() => import('./AppLayout'));
  }, []);

  return (
    <>
      <Suspense
        fallback={
          <div className="flex flex-auto flex-col h-[100vh]">
            <Loading loading={true} />
          </div>
        }>
        <AppLayout />
      </Suspense>
       <Toaster position='bottom-center'/>
    </>
  );
};

export default memo(Layout);

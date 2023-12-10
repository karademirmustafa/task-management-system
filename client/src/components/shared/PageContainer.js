import React from 'react';
import Header from 'components/layout/AppLayout/header';
import Sidebar from 'components/layout/AppLayout/sidebar';

const PageContainer = (props) => {
  const { children } = props;
  return (
    <div className="max-h-full overflow-hidden !overflow-y-hidden">
      <Header />
      <Sidebar children={children} />
    </div>
  );
};

export default PageContainer;

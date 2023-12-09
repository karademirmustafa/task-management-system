import React from 'react';
import Header from 'components/layout/AuthLayout/header';
import Sidebar from 'components/layout/AuthLayout/sidebar';

const PageContainer = (props) => {
  const { children, header, sidebar } = props;
  return (
    <div className="max-h-full overflow-hidden !overflow-y-hidden">
      {header && <Header />}
      {sidebar && <Sidebar children={children} />}
    </div>
  );
};

PageContainer.defaultProps = {
  sidebar: true,
  header: true
};

PageContainer.propTypes = {
  header: true,
  sidebar: true
};

export default PageContainer;

import React from 'react';
import { Card } from 'components/shared';
import { protectedRoutes,publicRoutes } from 'configs/routes.config';
const Home = () => {
  return (
    <div className="p-8">
    <h2 className="font-semibold mb-1">Info</h2>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
      {publicRoutes.map(pr => <Card {...pr}/>)}
      {protectedRoutes.map(pr => <Card {...pr}/>)}
    </div>
    </div>
  );
};

export default Home;

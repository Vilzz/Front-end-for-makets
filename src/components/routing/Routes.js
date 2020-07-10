import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import AdminPrivateRoutes from './AdminPrivateRoutes';

import Alert from '../layout/Alert';
import Register from '../auth/Register';
import Login from '../auth/Login';
import Forgotpassword from '../auth/Forgotpassword';
import Resetpassword from '../auth/Resetpassword';
import Admindashboard from '../dashboard/Admindashboard';
import Dashboard from '../dashboard/Dashboard';
import History from '../dashboard/History';
import Addimage from '../makets/Addimage';
import Maketslist from '../makets/Maketslist';
import Addmaket from '../makets/Addmaket';
import Editmaket from '../makets/Editmaket';
import Attributes from '../attributes/Attributes';
import Addattributes from '../attributes/Addattributes';
import Categories from '../categories/Categories';
import Addcategory from '../categories/Addcategory';
import Updatecategory from '../categories/Updatecategory';
import Users from '../users/Users';
import Updateuser from '../users/Updateuser.js';
import Itemslist from '../portfolio/Itemslist';
import Item from '../portfolio/Item';
import Orders from '../orders/Orders';
import Orderdetails from '../orders/Orderdetails';
import Basket from '../basket/Basket';
import Createorder from '../basket/Createorder';
import Packinglist from '../packing/Packinglist';
import Editpacking from '../packing/Editpacking';
import Addpacking from '../packing/Addpacking';
import Contact from '../portfolio/Contact';
import Contactedit from '../dashboard/Contactedit';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className='maincontent container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/forgotpassword' component={Forgotpassword} />
        <Route
          exact
          path='/resetpassword/:resettoken'
          component={Resetpassword}
        />
        <Route exact path='/portfolio' component={Itemslist} />
        <Route exact path='/maket/:slug' component={Item} />
        <Route exact path='/contacts' component={Contact} />
        <PrivateRoute exact path='/basket' component={Basket} />
        <PrivateRoute exact path='/createorder' component={Createorder} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute
          exact
          path='/dashboard/orderhistory'
          component={History}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard'
          component={Admindashboard}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/users'
          component={Users}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/updateuser/:id'
          component={Updateuser}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/makets'
          component={Maketslist}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/addmaket'
          component={Addmaket}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/editmaket/:id'
          component={Editmaket}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/:id/attributes/:attrid'
          component={Attributes}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/:id/addattributes'
          component={Addattributes}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/addimage/:id'
          component={Addimage}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/getcategories'
          component={Categories}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/updatecategory/:id'
          component={Updatecategory}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/addcategory'
          component={Addcategory}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/packing'
          component={Packinglist}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/addpacking'
          component={Addpacking}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/editpacking/:id'
          component={Editpacking}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/orders'
          component={Orders}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/order/:id'
          component={Orderdetails}
        />
        <AdminPrivateRoutes
          exact
          path='/admindashboard/contactedit'
          component={Contactedit}
        />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;

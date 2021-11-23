
import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Top from './component/Top';
import Login from './component/Login';
import Signup from './component/Signup';
import ProfileUpdate from './component/ProfileUpdate';
import Terms from './component/Terms';
import Privacy from './component/Privacy';
import Home from './component/Home';
import Mypage from './component/Mypage';
import SetProfile from './component/SetProfile';
import ChangeEmail from './component/ChangeEmail';
import ChangePassword from './component/ChangePassword';
import MyProfile from './component/MyProfile';
import ComingSoon from './component/ComingSoon';
import EventList from './component/EventList';
import AddNewEvent from './component/AddNewEvent';
import EventDetail from './component/EventDetail';
import ApplyEvent from './component/ApplyEvent';
import PointCharge from './component/PointCharge';
import SendPoint from './component/SendPoint';
import Points from './component/Points';
import Notifications from './component/Notifications';
import EmailVerify from './component/EmailVerify';
import Store from './component/Store';
import StoreDetail from './component/StoreDetail';
import Invite from './component/Invite';
import RealEstate from './component/RealEstate';
import MoneySeminar from './component/MoneySeminar';
import PreQuestion from './component/PreQuestion';

import "bootstrap-icons/font/bootstrap-icons.css";

class Routes extends React.Component {
  
  render() {
     var userData =  JSON.parse(localStorage.getItem("userData")) || null;
    return (
        <Router>
            <Switch>
                <Route exact from="/" component={Top} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <Route exact path='/terms' component={Terms} />
                <Route exact path='/privacy' component={Privacy} />
                {userData ? <Route exact path='/emailverify' component={EmailVerify} />:<Redirect to="/login" />}
                {userData ? <Route exact path='/register' component={ProfileUpdate} />:<Redirect to="/login" />}
                {userData ? <Route exact path='/home' component={Home}/>:<Redirect to="/login" />}
                {userData ? <Route exact path='/mypage' component={Mypage} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/setProfile' component={SetProfile} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/changeEmail' component={ChangeEmail} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/changePassword' component={ChangePassword} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/updateProfile' component={() => <ProfileUpdate footer={true} />}/>: <Redirect to="/login" />}
                {userData ? <Route exact path='/myProfile' component={MyProfile} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/eventList' component={EventList} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/addNewEvent' component={AddNewEvent} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/eventDetail/:id' component={EventDetail} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/applyEvent/:id' component={ApplyEvent} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/comingsoon' component={ComingSoon} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/pointCharge' component={PointCharge} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/sendPoint' component={SendPoint} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/points' component={Points} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/money_seminar' component={MoneySeminar} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/notifications' component={Notifications} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/prequestion' component={PreQuestion} /> : <Redirect to ="/login"/>}
                {userData ? <Route exact path='/invite' component={Invite} /> : <Redirect to="/login" />}
                {userData ? <Route exact path='/store' component={Store} /> : <Redirect to="/login" />}
                <Route exact path='/store/company'>
                  {userData?<Redirect to="/store/company/list" />:<Redirect to="/"/>}
                </Route>
                {userData ? <Route exact path='/store/company/*' component={StoreDetail} /> : <Redirect to="/login" />}
                <Route exact path='/real_estate'>
                  {userData?<Redirect to="/real_estate/list" />:<Redirect to="/"/>}
                </Route>
                {userData ? <Route exact path='/real_estate/*' component={RealEstate} /> : <Redirect to="/login" />}
            </Switch>
        </Router>
 
    );
  }
}

export default Routes;
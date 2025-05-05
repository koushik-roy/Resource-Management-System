import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BusinessUnit from "./components/businessUnit/BusinessUnit";
//import Register from "./component/user/RegisterComponent";
import AddResource from "./components/resource/AddResource";
import AddCustomerCategory from "./components/customerCategory/AddCustomerCategory";
import ViewCustomerCategory from "./components/customerCategory/ViewCustomerCategory";
import EditCustomerCategory from "./components/customerCategory/EditCustomerCategory";
import SkillSet from "./components/skillSet/SkillSet";
import EditSkills from "./components/skillSet/EditSkills";
import ViewSkills from "./components/skillSet/ViewSkills";
import EditRole from "./components/role/EditRole";
import ViewRoles from "./components/role/ViewRole";
import AddCustomer from "./components/customer/AddCustomer";
import ViewCustomer from "./components/customer/ViewCustomer";
import Cards from "./components/viewResource/Cards";
import AddRole from "./components/role/AddRole";
import Login from "./components/LoginComponent";
import Register from "./components/RegisterComponent";
import ForgotPassword from "./components/ForgotPasswordComponent";
import Dashboard from "./components/DashboardComponent";
import Project from "./components/project/Project";
import ViewProjectCard from "./components/viewProject/ViewProjectCard";
import ViewBusinessUnits from "./components/businessUnit/ViewBusinessUnits";
import EditBusinessUnits from "./components/businessUnit/EditBusinessUnits";
import EditCustomers from "./components/customer/EditCustomers";
import Protected from "./components/Protected";
import ViewRole from "./components/role/ViewRole";
import SingleEntityview from "./components/viewProject/SingleEntityview";
import EditProject from "./components/viewProject/EditProject";

import ViewSingleResource from "./components/viewResource/ViewSingleResource";
import EditResource from "./components/viewResource/EditResource";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            {" "}
            <Login />{" "}
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Protected Component={Dashboard} />
          </Route>
          <Route exact path="/addBusinessUnit">
            {" "}
            <Protected Component={BusinessUnit} />
          </Route>
          <Route path="/addResource">
            <Protected Component={AddResource} />
          </Route>
          <Route path="/addResourceRole">
            <Protected Component={AddRole} />
          </Route>
          <Route path="/addCustomer">
            <Protected Component={AddCustomer} />
          </Route>
          <Route path="/addCustomerCategory">
            <Protected Component={AddCustomerCategory} />
          </Route>
          <Route path="/viewProjects">
            <Protected Component={ViewProjectCard} />
          </Route>
          <Route path="/addskill">
            <Protected Component={SkillSet} />
          </Route>
          <Route path="/viewResources">
            <Protected Component={Cards} />
          </Route>
          <Route path="/addProject">
            <Protected Component={Project} />
          </Route>
          <Route path="/addSkillSet">
            <Protected Component={SkillSet} />
          </Route>
          <Route path="/viewRoles">
            <Protected Component={ViewRole} />
          </Route>
          <Route path="/SingleEntityview/:id">
            <Protected Component={SingleEntityview} />
          </Route>
          <Route path="/EditProject/:id">
            <Protected Component={EditProject} />
          </Route>
          <Route path="/viewCustomers">
            <Protected Component={ViewCustomer} />
          </Route>
          <Route path="/viewBusinessUnits">
            <Protected Component={ViewBusinessUnits} />
          </Route>
          <Route path="/editBusinessUnit/:id">
            <Protected Component={EditBusinessUnits} />
          </Route>
          <Route path="/editCustomer/:id">
            <Protected Component={EditCustomers} />
          </Route>
          <Route path="/viewCustomerCategory">
            <Protected Component={ViewCustomerCategory} />
          </Route>
          <Route path="/editCustomerCategory/:id">
            <Protected Component={EditCustomerCategory} />
          </Route>
          <Route path="/viewResource/:id">
            <Protected Component={ViewSingleResource} />
          </Route>
          <Route path="/editResource/:id">
            <Protected Component={EditResource} />
          </Route>
          <Route path="/viewSkills">
            <Protected Component={ViewSkills} />
          </Route>
          <Route path="/editSkills/:id">
            <Protected Component={EditSkills} />
          </Route>
          <Route path="/viewRoles">
            <Protected Component={ViewRoles} />
          </Route>
          <Route path="/editRoles/:id">
            <Protected Component={EditRole} />
          </Route>
          <Route path="/EditResource/:id">
            <Protected Component={EditResource} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

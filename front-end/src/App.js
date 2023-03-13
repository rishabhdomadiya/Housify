import "./App.css";
import "./css/extra.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBarBeforeLogin from "./components/NavBarBeforeLogin";
import NavBarAfterLogin from "./components/NavBarAfterLogin";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import UserProfile from "./components/UserProfile";
import SavedSearches from "./components/SavedSearches";
import { isLoggedIn } from "./utils/utility";
import HousesList from "./components/HousesList";
import AddHouse from "./components/AddHouse";
import HouseDetail from "./components/HouseDetail";
import HouseEdit from "./components/HouseEdit";
import DeleteHouse from "./components/DeleteHouse";
import RentalForm from "./components/RentalForm";
import ViewApplicationStatus from "./components/ViewApplicationStatus";
import UpdateApplicationStatus from "./components/UpdateApplicationStatus";
import ApplicantDetails from "./components/ApplicantDetails";
import Forum from "./components/Forum/Forum";
import NewThread from "./components/Forum/NewThread";
import ThreadReply from "./components/Forum/ThreadReply";
import Reviews from "./components/Reviews";
import AddReview from "./components/AddReview";
import EditReview from "./components/EditReview";
import ForgotPasswordEmail from "./components/forgotPasswordEmail";
import EnterNewPassword from "./components/enterNewPassword";
import CheckMail from "./components/CheckMail";
import Payment from "./components/Payment";
import ShowPayments from "./components/ShowPayments";

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? (
    <>
      <NavBarAfterLogin />
      {children}
    </>
  ) : (
    <Navigate to="/sign-in" replace={true} />
  );
};

const PublicRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/" replace={true} /> : children;
};

function App() {
  return (
    <>
      <div className="">
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/dashboard:houseid"
            element={
              <PrivateRoute>
                <HouseDetail />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/payment"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/show-payments"
            element={
              <PrivateRoute>
                <ShowPayments />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/saved-searches"
            element={
              <PrivateRoute>
                <SavedSearches />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/sign-in"
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/sign-up"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />

          <Route
            exact
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordEmail />
              </PublicRoute>
            }
          />

          <Route
            exact
            path="/check-mail"
            element={
              <PublicRoute>
                <CheckMail />
              </PublicRoute>
            }
          />

          <Route
            exact
            path="/new-password/:email"
            element={
              <PublicRoute>
                <EnterNewPassword />
              </PublicRoute>
            }
          />

          {/* Houses */}
          <Route
            path="/houses"
            element={
              <PrivateRoute>
                <HousesList />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/add-house"
            element={
              <PrivateRoute>
                <AddHouse />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/house/:id"
            element={
              <PrivateRoute>
                <HouseDetail />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/house/:id/edit"
            element={
              <PrivateRoute>
                <HouseEdit />
              </PrivateRoute>
            }
          ></Route>
          <Route
            exact
            path="/house/:id/delete"
            element={
              <PrivateRoute>
                <DeleteHouse />
              </PrivateRoute>
            }
          ></Route>

          {/* Reviews */}
          <Route
            exact
            path="/reviews"
            element={
              <PrivateRoute>
                <Reviews />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/house/:id/add-review"
            element={
              <PrivateRoute>
                <AddReview />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/house/:id/edit-review"
            element={
              <PrivateRoute>
                <EditReview />
              </PrivateRoute>
            }
          />

          <Route
            exact
            path="/RentalForm/:id"
            element={
              <PrivateRoute>
                <RentalForm />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ViewApplicationStatus"
            element={
              <PrivateRoute>
                <ViewApplicationStatus />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/UpdateApplicationStatus"
            element={
              <PrivateRoute>
                <UpdateApplicationStatus />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/ApplicantDetails"
            element={
              <PrivateRoute>
                <ApplicantDetails />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/forum"
            element={
              <PrivateRoute>
                <Forum />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/thread"
            element={
              <PrivateRoute>
                <NewThread />
              </PrivateRoute>
            }
          />
          <Route
            path="/thread/:id"
            element={
              <PrivateRoute>
                <ThreadReply />
              </PrivateRoute>
            }
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;

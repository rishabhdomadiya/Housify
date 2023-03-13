/* 
  authorName : Sanjuna Konda 
  email : sn493898@dal.ca
*/

import React, { useState, useEffect } from "react";
import { Card, Dropdown, DropdownButton, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import "../../css/Dashboard.css";

function Dashboard() {
  const [savePropertySuccess, setSavedPropertySuccess] = useState("");
  const [showHouses, setShowHouses] = useState([]);
  const [housesList, setHousesList] = useState([]);
  const [filtervalue, setFilterValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputFlag, setInputFlag] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    loadHouses();
  }, []);

  const loadHouses = (e) => {
    axios
      .get("https://group12-backend.herokuapp.com/getallhouses")
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.houses);
          setShowHouses(res.data.houses);
          setHousesList(res.data.houses);
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const handleSelect = (e) => {
    setFilterValue(e);
    setInputFlag(false);
  };
  const handleHouseClick = (id, email) => {
    navigate("/house/" + id, { state: { email } });
  };

  const handleSaveProperty = async (id) => {
    try {
      const url = "https://group12-backend.herokuapp.com/saveProperty";
      const res = await axios.post(url, {
        propertyID: id,
        email: localStorage.getItem("email"),
      });
      console.log("res", res);
      if (res.status === 200) {
        setSavedPropertySuccess("Property has been saved successfully.");
        window.scrollTo(0, 0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFilterInput = (event) => {
    if (event.target.value && filtervalue.match("city")) {
      let filteredHouses = housesList.filter((house) =>
        house.address.city
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
      setShowHouses(filteredHouses);
    }
    if (event.target.value && filtervalue.match("housetype")) {
      let filteredHouses = housesList.filter((house) =>
        house.rooms.toLowerCase().includes(event.target.value.toLowerCase())
      );
      setShowHouses(filteredHouses);
    }
    if (event.target.value && filtervalue.match("cost")) {
      let filteredHouses = housesList.filter(
        (house) => house.price == event.target.value
      );
      setShowHouses(filteredHouses);
    }
    if (event.target.value && filtervalue.match("peoplecount")) {
      let filteredHouses = housesList.filter(
        (house) => house.people_count == event.target.value
      );
      setShowHouses(filteredHouses);
    }
    if (!event.target.value && filtervalue.match("")) {
      setShowHouses(housesList);
    }
  };

  const token = localStorage.getItem("token");

  if (token == null) {
    navigate("/sign-in");
  }

  return (
    <div className="Dashboard">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="filterdropdown">
              <DropdownButton
                alignRight={true}
                title={
                  filtervalue ? "Filter by " + filtervalue : "Filter options"
                }
                id="dropdown-menu-align-right"
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="city">
                  Filter by city (Halifax or Darthmouth etc)
                </Dropdown.Item>
                <Dropdown.Item eventKey="housetype">
                  Filter by type of house (1 bhk or 2 bhk)
                </Dropdown.Item>
                <Dropdown.Item eventKey="cost">
                  Filter by cost (like 1420)
                </Dropdown.Item>
                <Dropdown.Item eventKey="peoplecount">
                  Filter by number of people( like 2 or 3)
                </Dropdown.Item>
              </DropdownButton>
              <input
                type="text"
                disabled={inputFlag}
                placeholder="enter filter value"
                className="form-group searchinput"
                onChange={handleFilterInput}
              />
            </div>
          </div>
        </div>
        <div className="row">
          {savePropertySuccess && (
            <Alert variant="success">{savePropertySuccess}</Alert>
          )}
          <Card className="totalCard">
            {showHouses.length > 0 ? (
              <div>
                <h2 className="heading" variant="primary">
                  {filtervalue.match("") ? (
                    <span>List of properties</span>
                  ) : (
                    <span>Search results</span>
                  )}
                </h2>
                <div>
                  {showHouses.map((item) => (
                    <div className="row propertyCard">
                      <div
                        className="col-sm-3"
                        onClick={() => handleHouseClick(item._id, item.email)}
                      >
                        <Card className="image">
                          <img src={item.selectedFile} alt="logo" />
                          <h6>House preview</h6>
                        </Card>
                      </div>
                      <div
                        className="col-sm-3"
                        onClick={() => handleHouseClick(item._id, item.email)}
                      >
                        <Card className="housedetails">
                          <span className="househeading">
                            {item.address.street},{item.address.city},
                            {item.address.province}
                          </span>
                          <br />
                          <span>CA$ {item.price}/Month</span>
                          <br />
                          <span>Type of house: {item.rooms}</span>
                          <br />
                          <span>Number of people: {item.people_count}</span>
                        </Card>
                      </div>
                      <div
                        className="col-sm-4"
                        onClick={() => handleHouseClick(item._id, item.email)}
                      >
                        <Card className="renterdetails">
                          <span className="househeading">
                            Renter Contact details
                          </span>
                          <br />
                          <span>
                            Mailing address:{" "}
                            <span className="emailstyle">{item.email}</span>
                          </span>
                          <br />
                          <span>Contact number: {item.phone}</span>
                        </Card>
                      </div>
                      <div className="col-sm-2">
                        <Button
                          variant="success saveproperty"
                          onClick={() => handleSaveProperty(item._id)}
                        >
                          Save property
                        </Button>
                      </div>
                    </div>
                  ))}{" "}
                </div>
              </div>
            ) : (
              <Card className="nohouses">
                <span>
                  No houses found for this filter, kindly choose some other
                  filter
                </span>
              </Card>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

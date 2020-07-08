import React from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";
import "tachyons";
import ErrorBoundary from "../components/ErrorBoundary";
//import { robots } from "./robots";

const App = (props) => {
  const [robotState, setRobotState] = React.useState({
    robots: [],
    searchfields: "",
  });

  React.useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobotState({ robots: users, searchfields: "" }));
  }, []);

  const handleRobotSearch = (event) => {
    console.log("handleChange");
    setRobotState({
      robots: robotState.robots,
      searchfields: event.target.value,
    });
  };
  const filteredRobots = robotState.robots.filter((robot) => {
    return robot.name
      .toLowerCase()
      .includes(robotState.searchfields.toLowerCase());
  });
  return (
    <div className="tc">
      <h1 className="f1">ROBO FRIENDS</h1>
      <SearchBox changed={handleRobotSearch} />
      <Scroll>
        <ErrorBoundary>
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

export default App;

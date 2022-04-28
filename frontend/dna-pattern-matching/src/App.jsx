import React from "react";
import "./App.scss";
import { AddDisease, DNATest, SearchFilter } from "./components/login/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAddDiseaseActive: true,
      isDNATestActive: false,
      isSearchActive: false
    };
  }

  componentDidMount() {
    //Add .right by default
    this.mostrightSide.classList.add("mostright");
    this.rightSide.classList.add("right");
  }

  changeState = (current) => {
    const { isAddDiseaseActive, isDNATestActive, isSearchActive } = this.state;
    if (current === "Tambah Penyakit") {
      this.setState(prevState => ({ isAddDiseaseActive: !prevState.isAddDiseaseActive }));
    }
    else if (current === "Tes DNA") {
      this.setState(prevState => ({ isDNATestActive: !prevState.isDNATestActive }));
    }
    else if (current === "Search Filter") {
      this.setState(prevState => ({ isSearchActive: !prevState.isSearchActive }));
    }

    if (isAddDiseaseActive) {
      this.leftSide.classList.remove("left");
      this.rightSide.classList.add("right");
      this.mostrightSide.classList.add("mostright");
      this.setState(prevState => ({ isAddDiseaseActive: !prevState.isAddDiseaseActive }));
    } 
    else if (isDNATestActive) {
      this.rightSide.classList.remove("right");
      this.leftSide.classList.add("left");
      this.mostrightSide.classList.add("mostright");
      this.setState(prevState => ({ isDNATestActive: !prevState.isDNATestActive }));
    }
    else if (isSearchActive) {
      this.mostrightSide.classList.remove("mostright");
      this.rightSide.classList.add("right");
      this.leftSide.classList.add("left");
      this.setState(prevState => ({ isSearchActive: !prevState.isSearchActive }));
    }
  }

  render() {
    const { isAddDiseaseActive, isDNATestActive, isSearchActive } = this.state;
    if (isAddDiseaseActive) {
      this.current = "Tambah Penyakit";
    }
    else if (isDNATestActive) {
      this.current = "Tes DNA";
    }
    else if (isSearchActive) {
      this.current = "Search Filter";
    }
    return (
      <div className="App">
        <div className="page">
          <div className="container" ref={ref => (this.container = ref)}>
            {isAddDiseaseActive && (
              <AddDisease containerRef={ref => (this.current = ref)} />
            )}
            {isDNATestActive && (
              <DNATest containerRef={ref => (this.current = ref)} />
            )}
            {isSearchActive && (
              <SearchFilter containerRef={ref => (this.current = ref)} />
            )}
          </div>
          <MostRightSide
            containerRef={ref => (this.mostrightSide = ref)}
            onClick={this.changeState.bind(this, "Search Filter")}
          />
          <RightSide
            containerRef={ref => (this.rightSide = ref)}
            onClick={this.changeState.bind(this, "Tes DNA")}
          />
          <LeftSide
            containerRef={ref => (this.leftSide = ref)}
            onClick={this.changeState.bind(this, "Tambah Penyakit")}
          />
        </div>
      </div>
    );
  }
}

const RightSide = props => {
  return (
    <div
      className="right-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">Tes DNA</div>
      </div>
    </div>
  );
};

const LeftSide = props => {
  return (
    <div
      className="left-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">Tambah Penyakit</div>
      </div>
    </div>
  );
};

const MostRightSide = props => {
  return (
    <div
      className="mostright-side"
      ref={props.containerRef}
      onClick={props.onClick}
    >
      <div className="inner-container">
        <div className="text">Search Hasil</div>
      </div>
    </div>
  );
};

export default App;

import React from 'react';
import './App.css';
import data from "./data/dummy.json"
import Table from './pages/test-table';

interface AppState {
  veri?: {}
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);
    this.dataGetir();
  }


  dataGetir = () => {
    let veri = data.hafta1.employees;
    veri.map((e) => {
      this.setState({
        veri: e.workDays
      });
    });
    console.log(veri);
  }

  render() {
    return <>
      <div className="App">
        <Table />
      </div>
    </>;
  }
}

export default App;

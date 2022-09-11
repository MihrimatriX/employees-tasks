import React from 'react';
import './App.css';
import SelectTime from './components/core/SelectTime';
import CoreTable from './components/CoreTable';
import EditTableEx from './components/EditTableEx';

export default class App extends React.Component {
  render() {
    return (<>
      <div className="App">
        <CoreTable />
        <EditTableEx styleProp={{padding: "50px"}}/>
        <SelectTime />
      </div>
    </>);
  }
}
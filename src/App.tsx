import React from 'react';
import './App.css';
import CoreTable from './components/CoreTable';
import EditTableEx from './components/EditTableEx';

export default class App extends React.Component {
  render() {
    return (<>
      <div className="App">
        <CoreTable />
        <EditTableEx />
      </div>
    </>);
  }
}
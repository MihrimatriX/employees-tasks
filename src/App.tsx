import React from 'react';
import './App.css';
import CoreTable from './components/CoreTable';

export default class App extends React.Component {
  render() {
    return (<>
      <div className="App">
        <CoreTable />
      </div>
    </>);
  }
}
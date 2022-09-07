import React from 'react';
import './App.css';
import CoreTable from './components/CoreTable';

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (<>
      <div className="App">
        <CoreTable docId='user3'/>
      </div>
    </>);
  }
}
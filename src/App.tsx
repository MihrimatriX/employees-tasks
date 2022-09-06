import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import React from 'react';
import './App.css';
import CoreTable from './components/CoreTable';
import { db } from './config/firebase';

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.setState({
      ...this.state
    });
  }

  async componentDidMount() {
    const docRef = doc(db, "users", "user");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      //this.setState({isim: docSnap.data().name});
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  render() {
    return (<>
      <div className="App">
        <CoreTable nameTitle={"this.state.isim!"} />
      </div>
    </>);
  }
}
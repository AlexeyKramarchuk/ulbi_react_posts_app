import React, {useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";

function App() {

  const [value, setValue] = useState('TEXT IN INPUT')





  return (
    <div className="App">
        <Counter />
        <ClassCounter />
    </div>
  );
}

export default App;

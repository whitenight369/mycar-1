import logo from './logo.svg';
import './App.less';
import {Button} from 'antd';
function App() {
  return (
    <div className="App">
      <h3>登录验证</h3>
        <Button>按钮</Button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
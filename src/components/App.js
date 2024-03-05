import React from 'react';
import '../styles/dist/App.min.css';
import Controls from '../containers/Controls';
import GameScreen from './GameScreen';
import MovesView from '../containers/MovesView';
import { Provider } from 'react-redux';
import { store } from '../store/configureStore';

class App extends React.Component
{
   constructor(props)
   {
      super(props)
      this.state = { level: 1 }
   }
   render()
   {
      return (
         <Provider store={store}>
            <div className="App">
               <GameScreen />
               <Controls />
               <MovesView />
            </div>
         </Provider>
      );
   }
}

export default App
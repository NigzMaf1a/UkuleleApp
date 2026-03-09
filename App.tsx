
import { StatusBar } from 'expo-status-bar';

//components
import ScrollScreen from './components/ScrollScreen';
import Menu from './navigation/Menu';
import Login from './views/Login';


export default function App() {
  return (
    <ScrollScreen>
      <StatusBar style="auto" />
    </ScrollScreen>
  );
}

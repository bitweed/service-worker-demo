import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  const check = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error('No Service Worker support!');
    }
    if (!('PushManager' in window)) {
      throw new Error('No Push API Support!');
    }
  }
  
  const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('assets/sw.js'); //notice the file name
    return swRegistration;
  }
  
  const requestNotificationPermission = async () => {
    const permission = await window.Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error('Permission not granted for Notification');
    }
  }

  const prepareSW = () => {
    check();
    registerServiceWorker();
    requestNotificationPermission();
  };

  return (
    <div>
      <h1>Hello World, Service Worker</h1>
      <button onClick={prepareSW}>Request for notification permission</button>
    </div>
  );
}

export default App;

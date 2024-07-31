import React from 'react';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {

  const [systemData, setSystemData] = useState({
    totalMemory: null,
    freeMemory: null,
    machin: null,
    hostName: null,
    uptime: null,
    osType: null
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('https://os-dashboard-two.vercel.app/os/data')
      .then((res) => {
        setSystemData({
          totalMemory: res.data.totalMemory,
          freeMemory: res.data.freeMemory,
          machin: res.data.machin,
          hostName: res.data.hostName,
          uptime: res.data.uptime,
          osType: res.data.osType // Add OS type to state
        });

        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [0]);

  return (
    <div id="App">
      <h1>Bella I.T Solutions</h1>
      <h2>System Information Dashboard</h2>
      <div id="memory_div">
        <div id="total_Memory">Total Memory (RAM): {systemData.totalMemory}</div>
        <div id="free_Memory">Free Memory (RAM): {systemData.freeMemory}</div>
        <div id="system_Path">System Path: {systemData.machin}</div>
        <div id="host_Name">Host Name: {systemData.hostName}</div>
        <div id="uptime">System Uptime: {systemData.uptime}</div>
        <div id="os_Type">Operating System: {systemData.osType}</div> {/* Added OS type display */}
      </div>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import Statuscheck from './components/Statuscheck';
import Priority from './components/Priority';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import './App.css'; 

function App() {
  
  const [userData, setuserData] = useState([]);
  const [isuserButtonClicked, setIsuserButtonClicked] = useState(false);
  const [isstatusButtonClicked,setIsstatusButtonClicked]=useState(false);
  const [ispriorityButtonClicked,setIspriorityButtonClicked]=useState(false);
  const [ispriority,setpriority]=useState(false);
  const [istitle,settitle]=useState(false);


  useEffect(() => {
   
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => setuserData(data))

      const storedState = localStorage.getItem('appState');
      if (storedState) {
        const parsedState = JSON.parse(storedState);
        setuserData(parsedState.userData);
        setIsuserButtonClicked(parsedState.isuserButtonClicked);
        setIsstatusButtonClicked(parsedState.isstatusButtonClicked);
        setIspriorityButtonClicked(parsedState.ispriorityButtonClicked);
        
      }
      
      
  }, []);

  useEffect(() => {
   
    const currentState = {
      userData,
      isuserButtonClicked,
      isstatusButtonClicked,
      ispriorityButtonClicked,
    };
    localStorage.setItem('appState', JSON.stringify(currentState));
  }, [userData, isuserButtonClicked, isstatusButtonClicked, ispriorityButtonClicked]);


  if (!userData || !userData.users || !Array.isArray(userData.users)) {
    return <div>Loading...</div>; 
  }
  const groupedData = {};

   const handleButtonClick = () => {
    setIspriorityButtonClicked(false);
    setIsstatusButtonClicked(false);
    setIsuserButtonClicked(true);
  };
  
  const handlestatusButtonClick = () => {
    setIspriorityButtonClicked(false);
    setIsuserButtonClicked(false);
    setIsstatusButtonClicked(true);
  };

  const handlepriorityButtonClick = () => {
    setIsstatusButtonClicked(false);
    setIsuserButtonClicked(false);
    setIspriorityButtonClicked(true);
  };

  const handlePriority=()=>{
    setpriority(true);
    settitle(false);
  }

  const handleTitle=()=>{
    settitle(true);
    setpriority(false);
  }

  userData.users.forEach(user => {
    const { group } = user;
    if (!groupedData[group]) {
      groupedData[group] = [];

    }
    groupedData[group].push(user);
  });

  const getTicketsForUser = (userId) => {
    return userData.tickets.filter(ticket => ticket.userId === userId);
  };

  const SortTicket=(tickets)=>{
         if(ispriority){
          return tickets.sort((a,b)=> a.priority-b.priority);
         }
  }

  // const SortTicketBytitle=(tickets)=>{
  //   if(istitle){
  //     return tickets.sort((a,b)=>a.title.localeCompare(b.title));
  //   }
  // }

  return (
   <>
    <div className='sec1'>
      <div className='box'>
      <div>
      <h3>Grouping</h3>
      <button onClick={handleButtonClick}>user</button>
      <button onClick={handlestatusButtonClick}>status</button>
      <button onClick={handlepriorityButtonClick}>priority</button>
      </div>

      <div>
        <h3>Sorting</h3>
      <button onClick={handlePriority}>priority</button>
      <button onClick={handleTitle}>Title</button>
      </div>
      </div>
      
      {Object.keys(groupedData).map(group => (
        <div key={group}>
          {isuserButtonClicked&&(
          <>
           <div className="user-cards">
              {groupedData[group].map(user => (
                <div key={user.id}>
                  <div className='edit'><h3>{` ${user.name}`}</h3>
                  <p><AddIcon/> <MoreHorizIcon/></p>
                  </div>
                  
                  <ul>
                    {
                      (getTicketsForUser(user.id).map(ticket => (
                      <li key={ticket.id} className='user-card'>
                        {<input type='checkbox'/>}
                        <div>
                         {` ${ticket.id}`}
                        <h4>{ticket.title}</h4>
                        {` Tag:${ticket.tag}`}
                        </div>
                        
                      </li>
                     )
                    ))
                    }
                  </ul>
                </div>
              ))}
            </div>
            </>
          )}
        </div>
      ))} 

      {
        isstatusButtonClicked&&!isuserButtonClicked&&!ispriorityButtonClicked&&(
          <Statuscheck ticketData={userData}/>
        )
      }

      {
        ispriorityButtonClicked&&!isuserButtonClicked&&!isstatusButtonClicked&&(
          <Priority ticketdata={userData}/>
         
        )
      }
</div> 
  </>
  );
}

export default App;
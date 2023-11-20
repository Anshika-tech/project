import React from 'react';
import '../App.css';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const Priority = ({ticketdata}) => {

    if (!ticketdata || !ticketdata.tickets || !Array.isArray(ticketdata.tickets)) {
        return <div>Loading...</div>; 
      }

    const groupedData = {};
 
  ticketdata.tickets.forEach(ticket => {
    const { priority } = ticket;
    if (!groupedData[priority]) {
      groupedData[priority] = [];
    }
    groupedData[priority].push(ticket);
  });
  const check=(priority)=>{
    if(priority==0){
        return "No priority";
    }
    else if(priority==1){
        return "Low";
    }
    else if(priority==2){
        return "Medium";
    }
    else if(priority==3){
        return "High";
    }
    else{
        return "Urgent";
    }
  }

  return (
    <>
      <div className='sec2'>
        {Object.keys(groupedData).map(priority => (
          <div key={priority} className='priority-cards'>
            <div className='edit'> <h2>{`${check(priority)} ${priority}`}</h2>
            <p><AddIcon/> <MoreHorizIcon/></p>
            </div>
           
            <div className="">
              {groupedData[priority].map(ticket => (
               
               <li key={ticket.id} className='priority-card'>
                <input type='checkbox'/>
                <div className='edit1'>
                  {` ${ticket.id}`}
                  <h4>{ticket.title}</h4>
                  {` Tag:${ticket.tag}`}
                </div>
             </li>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Priority;
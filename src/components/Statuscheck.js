import React from 'react';
import '../App.css';
import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


const Statuscheck = ({ticketData}) => {

  const groupedData = {};

  ticketData.tickets.forEach(ticket => {
    const { status } = ticket;
    if (!groupedData[status]) {
      groupedData[status] = [];
    }
    groupedData[status].push(ticket);
  });

  return (
    <>
    <div className='sec2'>
        {Object.keys(groupedData).map(status => (

          <div key={status} className='ticket-cards'>
            <div className='edit'><h2>{`Status: ${status}`}  </h2>
              <p> <AddIcon/> <MoreHorizIcon/></p>
            </div>
            
            <div >
              {groupedData[status].map(ticket => (
                     <li key={ticket.id} className='ticket-card'>
                      <input type='checkbox'/>
                         <div className='edit2'>
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

export default Statuscheck;
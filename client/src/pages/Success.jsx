import React, { useEffect, useState} from "react";
import { useMutation } from '@apollo/client';
import { ADD_DONATION } from '../utils/mutations';



function Success() {
 
  

  const [formState, setFormState] = useState({ nameOfdonator: '', donateAmount: '', message: '' });
  const [eventDetail, setEventDetail] = useState();
  const [addDonation, { error }] = useMutation(ADD_DONATION);
  
  useEffect(() => {

var customersDataString = sessionStorage.getItem("DonationData");
console.log(JSON.stringify(customersDataString));

//to get the object we have to parse it.
var customersData = JSON.parse(customersDataString);
console.log(customersData.formState.nameOfdonator);
console.log(customersData.formState.donateAmount);
console.log(customersData.formState.message);
console.log(customersData.eventName);
console.log(Object.keys(customersData));
setFormState({ ...formState, nameOfdonator: customersData.formState.nameOfdonator, donateAmount: customersData.formState.donateAmount, message: customersData.formState.message });
setEventDetail(customersData.event_ID);

  }, []);



  const handleClick = async (event) => {
    event.preventDefault();
     const donateAmount = parseInt(formState.donateAmount);
      const { data } = await addDonation({
        variables: { eventId:eventDetail,
                  ...formState,
                    donateAmount
                     },
      });

      sessionStorage.removeItem("DonationData");

      if(data){
         window.location.href = `http://localhost:3000/events/${eventDetail}`;
      }

console.log(formState.nameOfdonator);
console.log(eventDetail);

  };

  return (
    <div>
      <h1>*** Thanks you {formState.nameOfdonator}  for the support of our coffee<br />
       payment made Sucessfully ***
       <br /> Your support should be posted on our event</h1>
      <form onSubmit={handleClick}>
        <br />
       <button
            className="btn btn-block btn-primary"
            style={{ cursor: 'pointer' }}
            type="submit"
          >
            Go back to Event
          </button>
    </form>
    <br />     <br />     <br />
    </div>

  );
}

export default Success;
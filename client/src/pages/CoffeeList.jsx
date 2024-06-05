import { Link } from 'react-router-dom';
import React, { useState } from "react";


const CoffeeList = ({ coffeehouses, title }) => {

  const [filteredUsers, setFilteredUsers] = useState(coffeehouses);

  if (!coffeehouses.length) {
    return <h3>No Data Yet</h3>;
  }

  const handleFilter = (event) => {
    const value = event.target.value;
    const filtered = coffeehouses.filter(coffeehouse => coffeehouse.coffeeName.toLowerCase().includes(value.toLowerCase()));
    setFilteredUsers(filtered);
  };

  return (
    <div>



      <div id="portfolio" className="main-portfolio">
        <h2>{title}</h2>
        <input type="text" placeholder=" Search Coffee House" onChange={handleFilter} />
        <div className="grid-portfolio">
          {coffeehouses &&
            filteredUsers.map((coffeehouse) => {
              return (
                <div className="grid-item">

                  <div key={coffeehouse._id} className="row">

                    <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">



                      <img
                        src={"./uploads/" + coffeehouse.image}
                        //src={URL.createObjectURL(coffeehouse.image)}
                        className="shadow-1-strong rounded mb-4"
                        alt="picture not displayed"
                      />

                      <div>
                        <h3 className="Main-Text">
                          {coffeehouse.coffeeName}
                        </h3>
                        <div className="Extra-Text">
                          <p>
                            {coffeehouse.address}
                          </p>
                        </div>
                      </div>
                    </div>


                    <br />
                    <br />

                    <Link
                      className="btn btn-primary btn-block btn-squared"
                      to={`/coffeehouses/${coffeehouse._id}`}
                    >
                      Click to see details.
                    </Link>
                  </div>
                </div>

              );
            })}

        </div>
      </div>
    </div>

  );
};

export default CoffeeList;

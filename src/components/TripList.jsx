import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllTrips } from "../services/tripService";

function formatDate(dateArray) {
    const [year, month, day, hour, minute] = dateArray;
    return `${day}/${month}/${year} ${hour}:${minute}`;
}

function TripList({ addToWishlist }) {
    const [month, setMonth] = useState("");
    const [trips, setTrips] = useState([]);
    const months = ["Idle", "Jan", "Feb", "March", "April", "Mai", "June"];

    useEffect(() => {
        getAllTrips().then((data) => {
            setTrips(data);
        });
    }, []);

    const filteredTrips = month
        ? trips.filter((t) => t.startTrip[1] === parseInt(month)) // Compare the month (index 1 in the array)
        : trips;

    const filteredTripsMapped = filteredTrips.map((trip) => (
        <Trip addToWishlist={addToWishlist} trip={trip} key={trip.id} data-testid={`trip-item-${trip.id}`} />
    ));

    const empty = (
        <section>
            <p className="alert alert-info">Productlist is empty</p>
        </section>
    );

    return (
        <div className="container">
            <section>
                <h2 className="h4">Triplist-Catalog</h2>
                <section id="filters">
                    <label htmlFor="month">Filter by Month:</label>
                    <select
                        id="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">Mai</option>
                        <option value="6">June</option>
                    </select>
                    {month && (
                        <h2>
                            Found {filteredTrips.length}
                            {filteredTrips.length >= 1 ? " trips" : " trip"} for the month of
                            {" " + months[month]}
                        </h2>
                    )}
                </section>
                <div className="row">
                    {filteredTrips.length > 0 ? filteredTripsMapped : empty}
                </div>
            </section>
        </div>
    );
}

function Trip({ addToWishlist, trip }) {
    return (
        <div className="col-sm-6 col-md-4 col-lg-3" data-testid={`trip-item-${trip.id}`}>
            <figure className="card card-product">
                <div className="img-wrap">
                    <img src={`images/items/${trip.id}.jpg`} alt={trip.title} />
                </div>
                <figcaption className="info-wrap">
                    <h6 className="title">
                        {trip.title} {formatDate(trip.startTrip)} {formatDate(trip.endTrip)}
                    </h6>
                    <p className="card-text" data-testid="tripDescription">{trip.description}</p>
                    <div className="info-wrap row">
                        <button
                            type="button"
                            className="btn btn-link btn-outline"
                            onClick={() => addToWishlist(trip)}
                        >
                            <i className="fa fa-shopping-cart" /> Add to Wishlist
                        </button>
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}

export default TripList;
import React, {useState} from "react";
import "./App.css";

import Footer from "./Footer";
import Header from "./Header";
import TripList from "./components/TripList";
import Wishlist from "./components/Wishlist";


export default function App() {
    const [wishlist, setWishlist] = useState([]); // [1,2,3,4,5


    function addToWishlist(item) {
        const {id, title, description, startTrip, endTrip} = item;
        setWishlist((trip) => {
            const tripInWishlist = trip.find((t) => t.id === id);
            if (tripInWishlist) {
                return trip;
            } else {
                return [...trip, {id, title, description, startTrip, endTrip, hearted: false}];
            }
        });
    }

    function removeFromWishlist(item) {
        setWishlist((trip) => trip.filter((t) => t.id !== item.id));
    }

    function heartItem(item) {
        setWishlist(trip =>
            trip.map(trip =>
                trip.id === item.id
                    ? {...trip, hearted: !trip.hearted}
                    : trip
            )
        );
        console.log("Wishlist \n", wishlist.toString())
    }


    function clearWishlist() {
        setWishlist([]);
    }

    return (
        <>
            <div>
                <Header/>
                <main>
                    <h1>Welcome to biztrips Happy new Year-react - 2024</h1>

                    <Wishlist wishlist={wishlist} heartItem={heartItem} removeFromWishlist={removeFromWishlist}
                              clearWishlist={() => clearWishlist()}/>
                    {/*   <WishList />*/}
                    <TripList addToWishlist={addToWishlist}/>

                </main>
            </div>
            <Footer/>
        </>
    );
}

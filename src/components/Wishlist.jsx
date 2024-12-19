import React, {} from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// deconstruct props
export default function Wishlist({wishlist, heartItem, removeFromWishlist, clearWishlist}) {

    // as constant variant 2
    const itemsMapped = wishlist.map((item, index) => (

        <WishlistItem
            removeFromWishlist={removeFromWishlist}
            heartItem={heartItem}
            item={item}
            key={index}
        />
    ));

    const empty = (
        <tr>
            <td colSpan="4">
                {" "}
                <p data-testid="emptyWishlist" className="alert alert-info">Wishlist is empty</p>
            </td>
        </tr>
    );

    return (
        <div className="container">
            <>
                <h2 className="h4">Wishlist</h2>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card table-responsive">
                            <table className="table table-hover shopping-cart-wrap">
                                <thead className="text-muted">
                                <tr>
                                    <th scope="col">Trip</th>

                                    <th scope="col" width="120">
                                        Price
                                    </th>
                                    <th scope="col" width="200" className="text-right">
                                        Action
                                    </th>
                                </tr>
                                </thead>
                                <tbody>{itemsMapped.length > 0 ? itemsMapped : empty}</tbody>
                                <tfoot>
                                <tr>

                                    <th scope="col">
                                        <dl className="dlist-align">
                                            <dt>Total</dt>

                                        </dl>
                                    </th>
                                    <th scope="col"/>
                                    <th scope="col">
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={clearWishlist}
                                            disabled={itemsMapped.length === 0}
                                        >
                                            empty wishlist
                                        </button>
                                    </th>
                                </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}

function WishlistItem(props) {
    // deconstruct props
    const {removeFromWishlist, heartItem, item} = props;
    // props
    let {id, title, description, startTrip, endTrip, hearted} = item;

    return (
        <tr key={id} data-testid={`wishlist-item-${id}`}>
            <td>
                <figure className="media">

                    <div className="img-wrap">
                        <img
                            className="img-thumbnail img-xs"
                            src={"/images/items/" + id + ".jpg"}
                            alt="img"
                        />
                    </div>
                    <figcaption className="media-body">
                        <div className="d-flex justify-content-start align-items-center">
                            <h6 className="h6">{title}</h6>
                            {hearted
                                ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF0000">
                                        <path
                                            d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"/>
                                    </svg>
                                )
                                : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FF0000">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                                    </svg>
                                )
                            }
                        </div>
                        <dl className="dlist-inline small">
                            <dt>{title}</dt>
                            <dd>{description}</dd>
                        </dl>
                        <dl className="dlist-inline small">
                            <dt>{startTrip.toLocaleString()}</dt>
                            <dd>{endTrip.toLocaleString()}</dd>
                        </dl>
                    </figcaption>
                </figure>
            </td>
            <td className="price-wrap price"></td>
            <td className="text-right">
                <button
                    className="btn btn-outline-success fa fa-heart fa-xs"
                    onClick={() => heartItem(item)}
                >
                    {hearted ? "unheart Item" : "heart Item"}
                </button>
                <i className="fa-regular fa-heart"></i>
                <button
                    className="btn btn-outline-danger"
                    onClick={() => removeFromWishlist(item)}
                >
                    delete Item
                </button>
            </td>
        </tr>
    );
}


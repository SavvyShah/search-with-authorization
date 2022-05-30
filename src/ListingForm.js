import React from "react";
import { useState } from "react";

import "./ListingForm.css";

const defaultState = {
  name: "",
  location: "",
  accomodates: 0,
  price: 0,
  dateFrom: "",
  dateTo: "",
  bedroom: 0,
};

export default function ListingForm({ onClose }) {
  const [listing, setListing] = useState(defaultState);
  const handleChange = (e) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (listing.dateFrom > listing.dateTo) {
        throw new Error(
          `Validation Error: "Available from" should not be greater than "Available to"`
        );
      } else {
        const res = await fetch("/.netlify/function/createListing", {
          method: "POST",
          body: JSON.stringify({
            name: listing.name,
            date_to: listing.dateTo,
            date_from: listing.dateFrom,
            bedrooms: listing.bedroom,
            host_name: listing.host_name || "Anonymous",
            listing_url: "https://www.airbnb.com/rooms/1781873",
            image:
              "https://a1.muscache.com/im/pictures/25123883/1d7c2b2e_original.jpg?aki_policy=medium",
            has_availability: true,
            beds: 2,
            bed_type: "Real bed",
            location: {
              lon: -122.36470165349674 * Math.random() * 5,
              lat: 47.667596803320116 * Math.random() * 5,
            },
          }),
        });
        const savedListing = await res.json();
        if (savedListing) {
          setListing(defaultState);
          alert("Success! your listing has been created");
        }
      }
    } catch (e) {
      alert(e.message);
    }
  };
  return (
    <div className="modal__backdrop">
      <div className="modal">
        <form className="listing" onSubmit={handleSubmit}>
          <section className="modal__section modal__header text-center">
            <div className="modal__title">Listing form:</div>
            <div className="modal__close-btn" onClick={onClose}>
              <i className="fa fa-times"></i>
            </div>
          </section>
          <div className="input">
            <label className="input__label" htmlFor="listing-name">
              Name
            </label>
            <input
              onChange={handleChange}
              required
              className="input__box"
              id="listing-name"
              type="text"
              name="name"
              value={listing.name}
            />
          </div>

          <div className="input">
            <label className="input__label" htmlFor="listing-location">
              Location
            </label>
            <input
              onChange={handleChange}
              required
              className="input__box"
              id="listing-location"
              type="text"
              name="location"
              value={listing.location}
            />
          </div>

          <div className="input">
            <label className="input__label" htmlFor="listing-price">
              Price
            </label>
            <input
              onChange={handleChange}
              required
              className="input__box"
              id="listing-price"
              type="number"
              min={0}
              name="price"
              value={listing.price}
            />
          </div>

          <div className="input">
            <label className="input__label" htmlFor="listing-accomodates">
              Accomodates
            </label>
            <input
              onChange={handleChange}
              required
              className="input__box"
              id="listing-accomodates"
              type="number"
              min={0}
              name="accomodates"
              value={listing.accomodates}
            />
          </div>

          <div className="input">
            <label className="input__label" htmlFor="listing-dateFrom">
              Available from
            </label>
            <input
              onChange={handleChange}
              required
              className="input__box"
              id="listing-dateFrom"
              type="date"
              name="dateFrom"
              value={listing.dateFrom}
            />
          </div>

          <div className="input">
            <label className="input__label" htmlFor="listing-dateTo">
              Available to
            </label>
            <input
              onChange={handleChange}
              required
              className="input__box"
              id="listing-dateTo"
              type="date"
              name="dateTo"
              value={listing.dateTo}
            />
          </div>
          <div className="input">
            <label className="input__label" htmlFor="listing-bedroom">
              Bedrooms
            </label>
            <input
              onChange={handleChange}
              required
              className="input__box"
              id="listing-bedroom"
              type="number"
              min={0}
              name="bedroom"
              value={listing.bedroom}
            />
          </div>
          <div className="input">
            <input
              onChange={handleChange}
              type="submit"
              className="btn btn--primary"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

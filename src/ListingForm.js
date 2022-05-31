import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useState, useEffect } from "react";
import swal from "sweetalert2";

import "./ListingForm.css";
import LoadingSpinner from "./LoadingSpinner";
import useRole from "./useRole";

const defaultState = {
  name: "",
  host: "",
  accomodates: 0,
  price: 0,
  dateFrom: "",
  dateTo: "",
  bedroom: 0,
};

export default function ListingForm({ onClose }) {
  const [listing, setListing] = useState(defaultState);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth0();
  const role = useRole();

  useEffect(() => {
    if (role && role.name !== "host") {
      swal.fire({
        title: "Heads-up",
        icon: "info",
        text: "It doesn't seem you are a host. Only hosts can create a listing. You can change your role from the dropdown.",
        confirmButtonColor: "#32b5f9",
      });
      setLoading(false);
    } else if (role) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [role]);
  const handleChange = (e) => {
    setListing({ ...listing, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (listing.dateFrom > listing.dateTo) {
        throw new Error(
          `Validation Error: "Available from" should not be greater than "Available to"`
        );
      } else {
        const res = await fetch("/.netlify/functions/createListing", {
          method: "POST",
          body: JSON.stringify({
            name: listing.name,
            date_to: listing.dateTo,
            date_from: listing.dateFrom,
            bedrooms: listing.bedroom,
            accomodates: listing.accomodates,
            price: listing.price,
            host_name: listing.host_name || "Anonymous",
            listing_url: "https://www.airbnb.com/rooms/1781873",
            image:
              "https://a1.muscache.com/im/pictures/25123883/1d7c2b2e_original.jpg?aki_policy=medium",
            has_availability: true,
            beds: 2,
            bed_type: "Real bed",
            location: {
              lon: -122.36470165349674 + Math.random(),
              lat: 47.667596803320116 + Math.random(),
            },
            user_id: user.sub,
          }),
        });
        const savedListing = await res.json();
        if (savedListing.error) {
          throw new Error(savedListing.error);
        } else {
          setListing(defaultState);
          swal.fire({
            title: "Success",
            text: "Your listing has been created. It should be searchable now.",
            icon: "success",
            confirmButtonColor: "#32b5f9",
          });
        }
      }
      onClose(e);
    } catch (error) {
      swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        confirmButtonColor: "#32b5f9",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="modal__backdrop">
      {loading ? <LoadingSpinner /> : null}
      <div className="modal">
        <form className="listing" onSubmit={handleSubmit}>
          <section className="modal__section modal__header text-center">
            <div className="modal__title">Listing form</div>
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
            <label className="input__label" htmlFor="listing-host">
              Host name
            </label>
            <input
              onChange={handleChange}
              required
              className="input__box"
              id="listing-host"
              type="text"
              name="host"
              value={listing.host}
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

import React, { useState } from "react";
import axios from "axios";

const AddTicket = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    releasedate: "",
    available: false,
  });
  const [image, setImage] = useState(null);
  const [extraFields, setExtraFields] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleExtraChange = (e) => {
    const { name, value } = e.target;
    setExtraFields({ ...extraFields, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const generateExtraDescription = () => {
    const entries = Object.entries(extraFields);
    return entries.map(([key, value]) => `${key}: ${value}`).join(", ");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const fullDescription = `${product.description}${
      Object.keys(extraFields).length > 0 ? " | " + generateExtraDescription() : ""
    }`;

    const productToSend = {
      ...product,
      description: fullDescription,
    };

    const formData = new FormData();
    formData.append("image", image);
    formData.append("product", new Blob([JSON.stringify(productToSend)], { type: "application/json" }));

    axios
      .post("http://localhost:8080/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Product added successfully:", response.data);
        alert("Product added successfully");
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("Error adding product");
      });
  };

  const renderConditionalFields = () => {
    switch (product.category) {
      case "Train Tickets":
        return (
          <>
           <div className="col-md-6">
              <input className="form-control" name="Departure" placeholder="Departure Station" onChange={handleExtraChange} />
            </div>
             <div className="col-md-6">
              <input className="form-control" name="Arrival" placeholder="Arrival Station" onChange={handleExtraChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="trainName" placeholder="Train Name" onChange={handleExtraChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="trainNumber" placeholder="Train Number" onChange={handleExtraChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="coachNo" placeholder="Coach No." onChange={handleExtraChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="seatNo" placeholder="Seat No." onChange={handleExtraChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="quota" placeholder="Quota" onChange={handleExtraChange} />
            </div>
             <div className="col-md-4">
              <input className="form-control" name="Listedby" placeholder="Enter Your Name" onChange={handleExtraChange} />
            </div>
          </>
        );
      case "Event Tickets":
        return (
          <>
          <div className="col-md-6">
              <input className="form-control" name="EventName" placeholder="Event Name" onChange={handleExtraChange} />
            </div>
            <div className="col-md-6">
              <select className="form-select" name="eventType" onChange={handleExtraChange}>
                <option value="">Select Event Type</option>
                <option>Music Concert</option>
                <option>Comedy Show</option>
                <option>Educational Event</option>
                <option>Tech Meetup</option>
                <option>Art Exhibition</option>
                <option>Fashion Show</option>
                <option>Sports Event</option>
                <option>Others</option>
              </select>
            </div>
            <div className="col-md-6">
              <input className="form-control" name="Venue" placeholder="Venue" onChange={handleExtraChange} />
            </div>

            <div className="col-md-6">
              <input className="form-control" name="EntryLimit" placeholder="Entry Limit" onChange={handleExtraChange} />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="ticketCode" placeholder="Ticket Code" onChange={handleExtraChange} />
            </div>
             <div className="col-md-6">
              <input className="form-control" name="Listedby" placeholder="Enter Your Name" onChange={handleExtraChange} />
            </div>
             
          </>
        );
      case "Movie Tickets":
        return (
          <>
          <div className="col-md-6">
              <input className="form-control" name="MovieName" placeholder="Movie Name" onChange={handleExtraChange} />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="TheaterHall" placeholder="Theater Name" onChange={handleExtraChange} />
            </div>
            <div className="col-md-2">
              <input className="form-control" name="seatNo" placeholder="Seat No." onChange={handleExtraChange} />
            </div>
            <div className="col-md-2">
              <input className="form-control" name="screenNo" placeholder="Screen No." onChange={handleExtraChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="bookingId" placeholder="Booking ID" onChange={handleExtraChange} />
            </div>
             <div className="col-md-4">
              <input className="form-control" name="Listedby" placeholder="Enter Your Name" onChange={handleExtraChange} />
            </div>
          </>
        );
      case "Bus Tickets":
        return (
          <>
            <div className="col-md-6">
              <input className="form-control" name="pickupLocation" placeholder="Pickup Location" onChange={handleExtraChange} />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="dropLocation" placeholder="Drop Location" onChange={handleExtraChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="bookingId" placeholder="Booking ID" onChange={handleExtraChange} />
            </div>
             <div className="col-md-4">
              <input className="form-control" name="busNumber" placeholder="Bus Number" onChange={handleExtraChange} />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="busName" placeholder="Bus Name" onChange={handleExtraChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="Listedby" placeholder="Enter Your Name" onChange={handleExtraChange} />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 p-5 rounded" onSubmit={submitHandler}>
          <div className="col-12">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select className="form-select" value={product.category} onChange={handleInputChange} name="category">
              <option value="">Select category</option>
              <option value="Train Tickets">Train Ticket</option>
              <option value="Event Tickets">Event Ticket</option>
              <option value="Movie Tickets">Movie Ticket</option>
              <option value="Bus Tickets">Bus Ticket</option>
            </select>
          </div>

          {/* Conditionally Rendered Fields */}
          {renderConditionalFields()}

          <div className="col-md-6">
            <label className="form-label"><h6>Title</h6></label>
            <input type="text" className="form-control" placeholder="Enter Ticket Title" onChange={handleInputChange} value={product.name} name="name" />
          </div>

          <div className="col-md-6">
            <label className="form-label"><h6>Distributor</h6></label>
            <input type="text" name="brand" className="form-control" placeholder="Enter Your Booking Partner" value={product.brand} onChange={handleInputChange} />
          </div>

          <div className="col-12">
            <label className="form-label"><h6>Description</h6></label>
            <input type="text" className="form-control" placeholder="Base Description (optional)" value={product.description} name="description" onChange={handleInputChange} />
          </div>

          <div className="col-5">
            <label className="form-label"><h6>Price</h6></label>
            <input type="number" className="form-control" placeholder="Eg: ₹1000" onChange={handleInputChange} value={product.price} name="price" />
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Quantity</h6></label>
            <input type="number" className="form-control" placeholder="Stock" onChange={handleInputChange} value={product.quantity} name="quantity" />
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Listing Date</h6></label>
            <input type="date" className="form-control" value={product.releasedate} name="releasedate" onChange={handleInputChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Image</h6></label>
            <input className="form-control" type="file" onChange={handleImageChange} />
          </div>

          <div className="col-12">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" name="productAvailable" checked={product.available} onChange={(e) => setProduct({ ...product, available: e.target.checked })} />
              <label className="form-check-label">Ticket Available</label>
            </div>
          </div>

          <div className="col-12">
            <button type="submit" className="btn" style={{ backgroundColor: "#f97316", color: "white" }}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTicket;

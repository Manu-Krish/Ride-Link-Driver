"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import "./vehicle-details.css";

/* ── Mock Data ───────────────────────────────────────────── */

const vehicleData = {
  id: 1,
  name: "Tesla Model 3 Long Range",
  year: "2022",
  location: "San Francisco, CA",
  type: "Premium",
  price: 85,
  rating: 4.9,
  reviewCount: 124,
  specs: [
    { icon: "electric_car", label: "Electric" },
    { icon: "settings", label: "Auto" },
    { icon: "speed", label: "15k mi" },
    { icon: "airline_seat_recline_normal", label: "5 Seats" },
  ],
  images: [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSl9OHjrHwegJoLc3TFRvUQ_Dgv2MHpbxj7JeilLdmIi7Qp-DERMIfCgijP-sQQ_iREuWItagHwCUaXGaNPcdTqi6SggyXRG5mgwzPYTpLpEd7licbb3ypsUIc8o7v0NmiADb9VZvXClxd3vogflS7a47iwuj084KatDWOUPrzSJiTKecyA0KXfX6OKjSGfbogrCUkMwZ6ffDzxOQWS-7s8Nw0OlLqOL1QFQdJ9I-vKGF26GTwEzdOydsRTYNJu3xkDa-B6E7OQ5E",
      alt: "Silver Tesla Model 3 side view parked on city street",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBNz9vi9YPIYKQ339xl1Lo8iPrN57IJHS0loYDstNoB4wzk51p-LSTZtJjx3xywq1FgELGwfhrAeg0kcHqluUGkKubed6I7SBeVgm6nx6pq77kIwxmU7OsiMM1Wl-Kiuc3Ffa_gSQzPWXFkd1rNt5Ba59v0usr4p568SK6naIBIZzLtdAnvplJr-BPEhAgYD2YXETQeERoJfYlbpzPlU68hzUa5nu2JG7AxAa9mkEbHJ6RvIZDwPF5q9OSMPsf1j9PH1VCsLLKesNs",
      alt: "Tesla Model 3 interior view dashboard and steering wheel",
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDrDq5A40cWHo_7cUWsluXbPdf6xdQUICwdNECYX1OpGIZ8R30_lLSLqck0_CB6myNp4_KP-lpOSnFdQOFxdllMAuePnZV0FX6X3HK3AU9Am6U-xPnLYewT_XPG3XVoDWawmWFpPYj7q-6vvj9L0YPaiWAcIbCIXOE3pYpLSXzTpnW4dQwKu1QBnN4lzcMECxQSfarUTbjTjAF1zlInQ1CYh3x_I0TwqLy4aZ14_cr5Vhx1Qcy7nFlANsKbMSfYdDYJAv7RrEB6h4Q",
      alt: "Close up of Tesla car rim and wheel",
    },
  ],
  owner: {
    name: "Michael T.",
    responseTime: "< 1hr",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMhme62k2OxaoZ-i6zTc_-xrs0Tm5s_qjwS3KvFrOy6W-gPyusKI5aqrxFaHUF0fpNcPF5LerTWIGfQkesc-zlEEtQjMRNShpYLRVz-tj_9VhVa1mmXjFoU_RDTbfbxQoki1jaer6mW9aNLpNOUm0qpuUAB6ej7ChztQpFF8wNoely4SOwwLIsamzafd9KFRo1D7BcjaxxcNRe45JCarU5vOLBTd54L6BDpwuM_VQbnGvBZ_Q1_cZidhJa-bxXufaDowL3PTTyCC4",
  },
  description:
    "Pristine condition Model 3, perfect for weekend getaways or business trips. Includes Full Self-Driving capability and premium connectivity. Please return with at least 20% charge. No smoking or pets allowed.",
  reviews: [
    {
      id: 1,
      name: "Sarah J.",
      timeAgo: "2 days ago",
      text: "Car was super clean and Michael was very communicative. Highly recommend!",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAyKacGpzq1HYJQ4LcWeCYaRXVNyGQBRwVSeaVKkLEU8lk5BR2p-WZKoWFZX4kzn2kVRDezk0BvpNOw5zOh293B5rGSk6zuQWJ1x9Y0q7IuzdZ_P6hNdr69E9uGhTLr7LGXLWKmk9dAKeJttNRcY-S6m4fb3TXpqYNoHoKdY8bop8dkWxgmZM1zcI23ApXk5BNPjGjmiyYOOmLoUj03pWW8wHbKk--s6EIWidFEfy4GD-Yvzq8g-7XGWb7u_Tg_PngGroEbJ_vqQfE",
    },
  ],
  mapImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3OXsLcEArfpvP6HcucKDuv5angl2YyMkRvrBzz1j9m4Q9x7bF_JBysIcKWLtVyRg6MiitTab6CVmOPjN_eRUY4jk4aybJ_IpP6dSAjyud5scUn9ZuVny_mpJVi36QHLrcX6k2Q61vGVW8azqxLcB4n3N5CK7EPV1iXtmwgp3w_mLGP7328dYwANXrw1oZ6OlTXbNN6XP43UWnxOyr8T4ihh8D0GAeUQHvgzktCP33--BzgmUXftjgcffbeJg3U-7FvpLQfpymma0",
  pickupAddress: "Mission District, San Francisco (Exact address after booking)",
};

/* ── Page Component ─────────────────────────────────────── */

export default function VehicleDetailsPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);

  const vehicle = vehicleData;

  return (
    <div className="vd-root">
      {/* ── Top Navigation Overlay ──────────────────────── */}
      <div className="vd-topnav">
        <Link href="/home" className="vd-topnav-btn" aria-label="Go back">
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="flex gap-3">
          <button
            className="vd-topnav-btn"
            aria-label="Favorite vehicle"
            onClick={() => setIsFavorited(!isFavorited)}
          >
            <span className="material-icons">
              {isFavorited ? "favorite" : "favorite_border"}
            </span>
          </button>
          <button className="vd-topnav-btn" aria-label="Share vehicle">
            <span className="material-icons">share</span>
          </button>
        </div>
      </div>

      {/* ── Image Carousel ──────────────────────────────── */}
      <div className="vd-carousel-wrapper">
        <div className="vd-carousel">
          {vehicle.images.map((img, idx) => (
            <div
              key={idx}
              className={`vd-carousel-slide ${activeImage === idx ? "active" : ""}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="vd-carousel-img" />
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="vd-dots">
          {vehicle.images.map((_, idx) => (
            <button
              key={idx}
              className={`vd-dot ${activeImage === idx ? "active" : ""}`}
              onClick={() => setActiveImage(idx)}
              aria-label={`View image ${idx + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail Nav Arrows */}
        {activeImage > 0 && (
          <button
            className="vd-carousel-arrow vd-carousel-arrow--prev"
            onClick={() => setActiveImage(activeImage - 1)}
            aria-label="Previous image"
          >
            <span className="material-icons">chevron_left</span>
          </button>
        )}
        {activeImage < vehicle.images.length - 1 && (
          <button
            className="vd-carousel-arrow vd-carousel-arrow--next"
            onClick={() => setActiveImage(activeImage + 1)}
            aria-label="Next image"
          >
            <span className="material-icons">chevron_right</span>
          </button>
        )}
      </div>

      {/* ── Main Content ─────────────────────────────────── */}
      <main className="vd-content vd-animate-in">
        {/* Header: Title & Price */}
        <div className="vd-header">
          <div className="vd-header-left">
            <div className="vd-badges">
              <span className="vd-badge-type">{vehicle.type}</span>
              <span className="vd-rating">
                <span className="material-icons vd-star-icon">star</span>
                {vehicle.rating} ({vehicle.reviewCount})
              </span>
            </div>
            <h1 className="vd-title">{vehicle.name}</h1>
            <p className="vd-subtitle">
              {vehicle.year} • {vehicle.location}
            </p>
          </div>
          <div className="vd-price-block">
            <div className="vd-price">₹{vehicle.price}</div>
            <div className="vd-price-unit">/day</div>
          </div>
        </div>

        {/* Specs Grid */}
        <div className="vd-specs-grid">
          {vehicle.specs.map((spec, idx) => (
            <div key={idx} className="vd-spec-card">
              <div className="vd-spec-icon-wrap">
                <span className="material-icons vd-spec-icon">{spec.icon}</span>
              </div>
              <span className="vd-spec-label">{spec.label}</span>
            </div>
          ))}
        </div>

        {/* Owner Card */}
        <div className="vd-owner-card">
          <div className="vd-owner-info">
            <div className="vd-owner-avatar-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={vehicle.owner.avatar}
                alt={`Portrait of ${vehicle.owner.name}`}
                className="vd-owner-avatar"
              />
              <div className="vd-owner-verified-badge">
                <span className="material-icons vd-verified-icon">verified</span>
              </div>
            </div>
            <div>
              <h3 className="vd-owner-name">{vehicle.owner.name}</h3>
              <p className="vd-owner-response">
                Response time: {vehicle.owner.responseTime}
              </p>
            </div>
          </div>
          <button className="vd-owner-chat-btn" aria-label="Chat with owner">
            <span className="material-icons">chat_bubble_outline</span>
          </button>
        </div>

        {/* Description */}
        <div className="vd-section">
          <h3 className="vd-section-title">Vehicle Description</h3>
          <p className={`vd-description ${descExpanded ? "expanded" : ""}`}>
            {vehicle.description}
          </p>
          <button
            className="vd-read-more"
            onClick={() => setDescExpanded(!descExpanded)}
          >
            {descExpanded ? "Read less" : "Read more"}
          </button>
        </div>

        {/* Legal Protection */}
        <div className="vd-legal-card">
          <div className="vd-legal-inner">
            <span className="material-icons vd-legal-icon">gpp_good</span>
            <div>
              <h4 className="vd-legal-title">Legal Protection Active</h4>
              <p className="vd-legal-text">
                This rental is protected by SecureDrive Insurance. A digital
                agreement will be generated upon booking confirmation.
              </p>
              <div className="vd-legal-footer">
                <span className="vd-verified-tag">Verified Agreement</span>
                <a href="#" className="vd-view-terms">
                  View Terms
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Pickup Location Map */}
        <div className="vd-section">
          <h3 className="vd-section-title">Pickup Location</h3>
          <div className="vd-map-container">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vehicle.mapImage}
              alt="Map view of pickup location"
              className="vd-map-img"
            />
            <div className="vd-map-pin-overlay">
              <div className="vd-map-pin">
                <div className="vd-map-pin-inner">
                  <span className="material-icons vd-map-icon">near_me</span>
                </div>
              </div>
            </div>
          </div>
          <p className="vd-map-address">
            <span className="material-icons vd-map-address-icon">location_on</span>
            {vehicle.pickupAddress}
          </p>
        </div>

        {/* Reviews */}
        <div className="vd-section vd-reviews-section">
          <div className="vd-reviews-header">
            <h3 className="vd-section-title">
              Reviews ({vehicle.reviewCount})
            </h3>
            <a href="#" className="vd-view-all">
              View all
            </a>
          </div>

          <div className="vd-reviews-list">
            {vehicle.reviews.map((review) => (
              <div key={review.id} className="vd-review-card">
                <div className="vd-review-header">
                  <div className="vd-review-user">
                    <div className="vd-review-avatar-wrap">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={review.avatar}
                        alt={`Avatar of ${review.name}`}
                        className="vd-review-avatar"
                      />
                    </div>
                    <span className="vd-review-name">{review.name}</span>
                  </div>
                  <span className="vd-review-time">{review.timeAgo}</span>
                </div>
                <p className="vd-review-text">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer for the sticky footer */}
        <div style={{ height: "100px" }} />
      </main>

      {/* ── Sticky Footer CTA ────────────────────────────── */}
      <div className="vd-footer-cta">
        <div className="vd-footer-inner">
          <div className="vd-footer-price-block">
            <div className="vd-footer-price">
              <span className="vd-footer-price-amount">₹{vehicle.price}</span>
              <span className="vd-footer-price-unit">/ day</span>
            </div>
            <button className="vd-footer-breakdown">
              View price breakdown
            </button>
          </div>
          <button className="vd-book-btn" id="request-booking-btn">
            <span>Request Booking</span>
            <span className="material-icons vd-book-arrow">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

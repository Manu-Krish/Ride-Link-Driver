"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import FilterModal from "@/components/features/FilterModal";

import "./home.css";

/* ── Data ───────────────────────────────────────────────── */

const categories = [
  { label: "SUVs", icon: "local_shipping", active: true },
  { label: "Electric", icon: "electric_car", active: false },
  { label: "Sports", icon: "speed", active: false },
  { label: "Budget", icon: "savings", active: false },
];

const recommendedVehicles = [
  {
    id: 1,
    name: "Tesla Model 3",
    year: "2022",
    type: "Electric",
    price: 85,
    rating: 5.0,
    image: "/images/home/tesla-model-3.jpg",
  },
  {
    id: 2,
    name: "Toyota Camry",
    year: "2021",
    type: "Hybrid",
    price: 45,
    rating: 4.9,
    image: "/images/home/toyota-camry.jpg",
  },
  {
    id: 3,
    name: "Ford Mustang",
    year: "2020",
    type: "Sport",
    price: 95,
    rating: 4.8,
    image: "/images/home/ford-mustang.jpg",
  },
];

const nearbyListings = [
  {
    id: 1,
    name: "Chevrolet Tahoe",
    year: "2021",
    type: "Automatic",
    distance: "0.8 mi away",
    price: 110,
    rating: 4.9,
    trips: 42,
    image: "/images/home/chevrolet-tahoe.jpg",
    badge: { label: "Verified Owner", icon: "verified_user", color: "primary" as const },
    tag: { label: "Instant Book", icon: "check_circle", color: "green" as const },
  },
  {
    id: 2,
    name: "BMW 3 Series",
    year: "2020",
    type: "Luxury",
    distance: "1.2 mi away",
    price: 75,
    rating: 4.7,
    trips: 18,
    image: "/images/home/bmw-3-series.jpg",
    badge: null,
    tag: { label: "Insured", icon: "shield", color: "primary" as const },
  },
  {
    id: 3,
    name: "Honda Civic",
    year: "2019",
    type: "Economy",
    distance: "2.5 mi away",
    price: 40,
    rating: 5.0,
    trips: 8,
    image: "/images/home/honda-civic.jpg",
    badge: null,
    tag: { label: "Insured", icon: "shield", color: "primary" as const },
  },
];

/* ── Page Component ─────────────────────────────────────── */

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("SUVs");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f6f7f8] font-[Inter,sans-serif] text-gray-800 antialiased pb-24 lg:pb-8">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="px-5 pt-12 pb-4 flex justify-between items-center bg-white sticky top-0 z-50 shadow-sm lg:pt-6 lg:px-8">
        <div className="w-full max-w-[1280px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-[#136dec]/20 bg-[#136dec]/10 flex items-center justify-center overflow-hidden">
                <svg className="w-6 h-6 text-[#136dec]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Welcome back,</p>
              <h1 className="text-lg font-bold text-gray-900 leading-tight">Alex Driver</h1>
            </div>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-500">
            <Link href="/home" className="text-[#136dec] flex items-center gap-1.5">
              <span className="material-icons text-lg">home</span> Home
            </Link>
            <Link href="#" className="hover:text-gray-700 flex items-center gap-1.5 transition-colors">
              <span className="material-icons text-lg">calendar_today</span> Bookings
            </Link>
            <Link href="#" className="hover:text-gray-700 flex items-center gap-1.5 transition-colors">
              <span className="material-icons text-lg">chat_bubble_outline</span> Messages
            </Link>
            <Link href="#" className="hover:text-gray-700 flex items-center gap-1.5 transition-colors">
              <span className="material-icons text-lg">person_outline</span> Profile
            </Link>
          </nav>

          <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Notifications">
            <span className="material-icons text-gray-600">notifications_none</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>
        </div>
      </header>

      {/* ── Main Content ────────────────────────────────── */}
      <main className="w-full max-w-[1280px] mx-auto home-animate-in">
        {/* Search */}
        <div className="px-5 pt-6 pb-2 lg:px-8">
          <div className="relative group w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-icons text-[#136dec]/70">search</span>
            </div>
            <input
              className="block w-full pl-10 pr-12 py-3.5 bg-white border-none ring-1 ring-gray-200 rounded-xl text-sm shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-[#136dec] focus:bg-white transition-all outline-none"
              placeholder="Search by city, airport, or car type..."
              type="text"
              id="home-search"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="p-1.5 rounded-lg bg-[#136dec]/10 hover:bg-[#136dec]/20 text-[#136dec] transition-colors relative"
                aria-label="Filters"
              >
                <span className="material-icons text-lg">tune</span>
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-3 overflow-x-auto px-5 py-4 no-scrollbar lg:px-8">
          {categories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                activeCategory === cat.label
                  ? "bg-[#136dec] text-white shadow-md shadow-[#136dec]/20"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <span className="material-icons text-sm">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Recommended Vehicles ──────────────────────── */}
        <section className="mt-4">
          <div className="px-5 flex justify-between items-end mb-4 lg:px-8">
            <h2 className="text-lg font-bold text-gray-900">Recommended for You</h2>
            <a className="text-sm font-medium text-[#136dec] hover:text-[#136dec]/80" href="#">
              See All
            </a>
          </div>

          {/* Mobile: horizontal scroll · Desktop: grid */}
          <div className="flex overflow-x-auto gap-4 px-5 pb-6 no-scrollbar snap-x lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-8">
            {recommendedVehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/vehicles/${vehicle.id}`}
                className="snap-center shrink-0 w-64 lg:w-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer block"
              >
                <div className="relative h-36 lg:h-44">
                  <Image
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                    src={vehicle.image}
                    fill
                    sizes="(max-width: 1024px) 256px, 33vw"
                  />
                  {/* Rating badge */}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
                    <span className="material-icons text-[10px] text-yellow-500">star</span>
                    {vehicle.rating}
                  </div>
                  {/* Favorite */}
                  <button
                    className="absolute top-2 right-2 p-1.5 bg-black/30 hover:bg-black/50 backdrop-blur-md rounded-full text-white transition-colors"
                    aria-label={`Favorite ${vehicle.name}`}
                  >
                    <span className="material-icons text-sm">favorite_border</span>
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-gray-900 truncate">{vehicle.name}</h3>
                      <p className="text-xs text-gray-500">
                        {vehicle.year} • {vehicle.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-[#136dec] font-bold">₹{vehicle.price}</span>
                      <span className="text-[10px] text-gray-400">/day</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Nearby Listings ───────────────────────────── */}
        <section className="px-5 mt-2 lg:px-8">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-bold text-gray-900">Nearby Listings</h2>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="material-icons text-sm text-[#136dec]">location_on</span>
              San Francisco, CA
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
            {nearbyListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/vehicles/${listing.id}`}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden card-hover cursor-pointer block"
              >
                <div className="relative h-48 lg:h-56">
                  <Image
                    alt={listing.name}
                    className="w-full h-full object-cover"
                    src={listing.image}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Badge */}
                  {listing.badge && (
                    <div className="absolute top-3 left-3 bg-[#136dec]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-md text-xs font-medium flex items-center gap-1 shadow-md">
                      <span className="material-icons text-sm">{listing.badge.icon}</span>
                      {listing.badge.label}
                    </div>
                  )}
                  {/* Favorite on cards without badge */}
                  {!listing.badge && (
                    <div className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-full cursor-pointer transition-colors">
                      <span className="material-icons text-white text-lg drop-shadow-md">favorite_border</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{listing.name}</h3>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <span>{listing.year}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{listing.type}</span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>{listing.distance}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[#136dec] font-bold text-xl">₹{listing.price}</div>
                      <div className="text-xs text-gray-400">per day</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center text-yellow-500">
                        <span className="material-icons text-sm">star</span>
                        <span className="text-sm font-bold text-gray-900 ml-1">{listing.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">({listing.trips} trips)</span>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded ${
                        listing.tag.color === "green"
                          ? "text-green-600 bg-green-50"
                          : "text-[#136dec] bg-[#136dec]/10"
                      }`}
                    >
                      <span className="material-icons text-xs">{listing.tag.icon}</span>
                      {listing.tag.label}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* ── Bottom Navigation (mobile only) ─────────────── */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 safe-area-bottom z-50 lg:hidden">
        <div className="flex justify-around items-center h-16 px-2">
          <Link
            href="/home"
            className="flex flex-col items-center justify-center w-full h-full text-[#136dec] group"
          >
            <span className="material-icons text-2xl mb-1 group-hover:scale-110 transition-transform">home</span>
            <span className="text-[10px] font-medium">Home</span>
          </Link>
          <Link
            href="/bookings"
            className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-icons text-2xl mb-1">directions_car</span>
            <span className="text-[10px] font-medium">Rental</span>
          </Link>
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            <button
              className="absolute -top-6 bg-[#136dec] text-white rounded-full p-4 shadow-lg shadow-[#136dec]/30 border-4 border-white hover:bg-blue-600 transition-colors fab-button"
              aria-label="Add new listing"
            >
              <span className="material-icons text-2xl">add</span>
            </button>
          </div>
          <Link
            href="#"
            className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-icons text-2xl mb-1">chat_bubble_outline</span>
            <span className="text-[10px] font-medium">Messages</span>
          </Link>
          <Link
            href="#"
            className="flex flex-col items-center justify-center w-full h-full text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="material-icons text-2xl mb-1">person_outline</span>
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={(filters) => {
          console.log("Applied filters:", filters);
          setIsFilterOpen(false);
        }}
      />
    </div>
  );
}

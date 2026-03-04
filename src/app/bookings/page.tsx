"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import "./bookings.css";

/* ── Mock Data ───────────────────────────────────────────── */

const activeRental = {
  id: "8832-A",
  vehicleName: "Toyota Camry SE",
  licensePlate: "8XYZ 924",
  color: "Silver",
  type: "PREMIUM SEDAN",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCJa-I5jMM67-6PK1wUvv2acARCgivzO1yM8EiwrD1MKJm21BDzxCqqJ12VaNe6MRqlGLfWdhA-4UG4yb5-Zj5Fg25C217zpaXfHw5ryRLO7NZOKGsw3inyFFqPJ2_N5RQSHkWVqv-H8mFv1U27X9W1Y3s0ZW4F8Hey6SeiWuwg2wn063IzPdKbfiptRfzm0rksNauwpje33vOA4lzBhJsEZtQZCjm0XTy3GwZtuB9SDoXoxaflTitzn8e69IP_mwxqrqaXnUXSzqk",
  timeRemainingText: "12h 30m",
  progressPercent: 65,
  startTime: "8:00 AM",
  dueTime: "9:00 PM",
  upcomingPaymentName: "Weekly Rental Fee",
  upcomingPaymentAmount: 45.0,
  upcomingPaymentDueDate: "Oct 24",
  mapImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCaNftUtyqkq2Dx-m6tSSHnBcOYBKooFf0FWRjQKa88zuKKhj9KlHUaPVYNN-KAkRShYYdCtPoQeUk3XC6VdMqFtQw4AcsVNkxYOKu1WjA53dHVFYv2mezohZTJFCtMNnWEIxEPqjWyP1QfNmgGZKN5_w8CzTN0XMsLqLI3NVOes81U7M-xUMIancly00lYD-cE_ykEHspJeTlWEnXl6jZ0GQ5trCtilLkTtRaP0bste0edKm8iiRznH3KM3ZylCUUPdeMudR0ZcvM",
  locationText: "Near 4th & King St.",
};

const user = {
  firstName: "Alex",
  avatar:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCcMVRHbY3Qn5qalBfAjj0MIKWCt5jLaao9LSXDe4wb3hSBFOpmjzMi4VfzJFgZmUahOBtShVxhZyo1bR46NvtieyiM1KnDZe5f4-iJj5zCYVsxFFex6BFsCq3oqcM5s8hB5w8mIw0fGVT6oEDfzulUAAEQL0nIGBWJBM5EjyvaKe7EJyDkCvj_xOM8-3U2mJuCEfQK7CXMMYhv73FFUyf8_uIJTSBOvFD9pmhFp-g-Lz-iqHMyP3XwHWZPAevaN-gJyFwkUcgeIM4",
};

/* ── Page Component ─────────────────────────────────────── */

export default function BookingsPage() {
  const [hasUnreadNotification, setHasUnreadNotification] = useState(true);

  return (
    <div className="bk-root selection:bg-primary/30 selection:text-primary">
      {/* Container matching mobile width with padding at bottom for nav */}
      <div className="mx-auto max-w-md bg-background-light min-h-screen relative shadow-2xl overflow-hidden pb-24 dark:bg-background-dark">
        {/* ── Status Header ────────────────────────────── */}
        <header className="sticky top-0 z-50 bg-background-light/90 backdrop-blur-md px-6 py-5 flex items-center justify-between border-b border-gray-200 dark:bg-background-dark/90 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={user.avatar}
                alt="Driver profile picture"
                className="w-10 h-10 rounded-full object-cover border-2 border-primary"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-background-dark"></div>
            </div>
            <div>
              <h1 className="text-sm font-medium text-gray-500 leading-tight dark:text-gray-400">
                Good Morning,
              </h1>
              <p className="text-base font-bold text-gray-900 leading-tight dark:text-white">
                {user.firstName}
              </p>
            </div>
          </div>
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors dark:hover:bg-gray-800"
            onClick={() => setHasUnreadNotification(false)}
          >
            <span className="material-icons text-gray-600 dark:text-gray-300">
              notifications_none
            </span>
            {hasUnreadNotification && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
        </header>

        {/* ── Main Content Scrollable Area ─────────────── */}
        <main className="px-5 pt-6 space-y-6 bk-animate-in">
          {/* Active Status Indicator */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Current Rental
            </h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
              Active
            </span>
          </div>

          {/* Active Vehicle Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative group dark:bg-gray-800 dark:border-gray-700">
            {/* Vehicle Image */}
            <div className="relative h-48 w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeRental.image}
                alt="Side profile of a silver modern sedan car"
                className="w-full h-full object-cover mix-blend-overlay opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-medium tracking-wide">
                {activeRental.type}
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {activeRental.vehicleName}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1 dark:text-gray-400">
                    <span className="material-icons text-base">pin</span>
                    {activeRental.licensePlate} • {activeRental.color}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase font-semibold">
                    Rental ID
                  </p>
                  <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                    #{activeRental.id}
                  </p>
                </div>
              </div>

              {/* Progress Bar / Time Remaining */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Time Remaining
                  </span>
                  <span className="text-sm font-bold text-primary">
                    {activeRental.timeRemainingText}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden dark:bg-gray-600">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${activeRental.progressPercent}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-400">
                  <span>Started: {activeRental.startTime}</span>
                  <span>Due: {activeRental.dueTime}</span>
                </div>
              </div>

              {/* Primary Actions Grid (Within Card) */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-white rounded-lg font-medium text-sm hover:bg-blue-600 transition-colors shadow-sm shadow-blue-200 dark:shadow-none">
                  <span className="material-icons text-sm">
                    add_circle_outline
                  </span>
                  Extend Rental
                </button>
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 bg-white text-gray-700 border border-gray-200 rounded-lg font-medium text-sm hover:bg-gray-50 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600">
                  <span className="material-icons text-sm">lock_open</span>
                  Unlock / Lock
                </button>
              </div>
            </div>
          </div>

          {/* Payment Module */}
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg dark:bg-primary/20">
                <span className="material-icons text-primary">
                  account_balance_wallet
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase font-semibold dark:text-gray-400">
                  Upcoming Payment
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activeRental.upcomingPaymentName}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  ${activeRental.upcomingPaymentAmount.toFixed(2)}
                </p>
                <p className="text-xs text-red-500 font-medium">
                  Due {activeRental.upcomingPaymentDueDate}
                </p>
              </div>
            </div>
            <button className="w-full py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-semibold text-sm transition-colors flex justify-center items-center gap-2">
              Pay Now
              <span className="material-icons text-sm">arrow_forward</span>
            </button>
          </div>

          {/* Quick Actions Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Digital Agreement */}
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors group dark:bg-gray-800 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                <span className="material-icons">description</span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Agreement
              </span>
            </button>
            {/* Report Issue */}
            <button className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center gap-2 hover:border-red-500/50 transition-colors group dark:bg-gray-800 dark:border-gray-700">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-red-50 group-hover:text-red-500 transition-colors text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                <span className="material-icons">report_problem</span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Report Issue
              </span>
            </button>
          </div>

          {/* Map Preview (Location) */}
          <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100 relative h-32 dark:border-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeRental.mapImage}
              alt="Overhead map view of city streets"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
              <div className="flex items-center gap-2 text-white">
                <span className="material-icons text-sm">near_me</span>
                <span className="text-sm font-medium">
                  {activeRental.locationText}
                </span>
              </div>
            </div>
          </div>
        </main>

        {/* ── Bottom Navigation ────────────────────────── */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-40 dark:bg-gray-900 dark:border-gray-800 pb-[calc(12px+env(safe-area-inset-bottom,0px))]">
          <Link
            href="/home"
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-500 dark:hover:text-gray-300"
          >
            <span className="material-icons">search</span>
            <span className="text-[10px] font-medium">Explore</span>
          </Link>
          <Link
            href="/bookings"
            className="flex flex-col items-center gap-1 text-primary"
          >
            <span className="material-icons">directions_car</span>
            <span className="text-[10px] font-medium">Rental</span>
          </Link>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-500 dark:hover:text-gray-300">
            <span className="material-icons">chat_bubble_outline</span>
            <span className="text-[10px] font-medium">Messages</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors dark:text-gray-500 dark:hover:text-gray-300">
            <span className="material-icons">person_outline</span>
            <span className="text-[10px] font-medium">Profile</span>
          </button>
        </nav>
      </div>
    </div>
  );
}

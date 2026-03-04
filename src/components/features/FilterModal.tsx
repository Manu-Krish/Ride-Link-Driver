"use client";

import { useCallback, useEffect, useState } from "react";

/* ── Types ──────────────────────────────────────────── */

interface FilterState {
  vehicleTypes: string[];
  priceRange: [number, number];
  fuelTypes: string[];
  transmission: string;
}

const DEFAULT_FILTERS: FilterState = {
  vehicleTypes: ["Sedan"],
  priceRange: [30, 150],
  fuelTypes: ["hybrid"],
  transmission: "automatic",
};

/* ── Vehicle Type Options ────────────────────────────── */

const vehicleTypeOptions = [
  { id: "Sedan", label: "Sedan", icon: "directions_car" },
  { id: "SUV/Van", label: "SUV/Van", icon: "airport_shuttle" },
  { id: "Taxi", label: "Taxi", icon: "local_taxi" },
];

/* ── Fuel Options ────────────────────────────────────── */

const fuelOptions = [
  {
    id: "gasoline",
    label: "Gasoline",
    icon: "local_gas_station",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    id: "hybrid",
    label: "Hybrid / Electric",
    icon: "eco",
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
  },
];

/* ── Component ───────────────────────────────────────── */

export default function FilterModal({
  isOpen,
  onClose,
  onApply,
}: {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}) {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [isAnimating, setIsAnimating] = useState(false);

  /* Animate in/out */
  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger CSS transition
      requestAnimationFrame(() => setIsAnimating(true));
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      setIsAnimating(false);
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  /* Toggle vehicle type */
  const toggleVehicleType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      vehicleTypes: prev.vehicleTypes.includes(type)
        ? prev.vehicleTypes.filter((t) => t !== type)
        : [...prev.vehicleTypes, type],
    }));
  };

  /* Toggle fuel type */
  const toggleFuelType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      fuelTypes: prev.fuelTypes.includes(type)
        ? prev.fuelTypes.filter((t) => t !== type)
        : [...prev.fuelTypes, type],
    }));
  };

  /* Price range handler */
  const handlePriceChange = (index: 0 | 1, value: number) => {
    setFilters((prev) => {
      const newRange: [number, number] = [...prev.priceRange] as [number, number];
      newRange[index] = value;
      // Ensure min <= max
      if (index === 0 && value > newRange[1]) newRange[1] = value;
      if (index === 1 && value < newRange[0]) newRange[0] = value;
      return { ...prev, priceRange: newRange };
    });
  };

  /* Reset */
  const handleReset = () => setFilters(DEFAULT_FILTERS);

  /* Apply */
  const handleApply = () => {
    onApply(filters);
    handleClose();
  };

  if (!isOpen) return null;

  const minPercent = ((filters.priceRange[0] - 10) / 290) * 100;
  const maxPercent = ((filters.priceRange[1] - 10) / 290) * 100;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:max-w-lg lg:mx-auto ${
          isAnimating ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "85vh" }}
      >
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mt-4 mb-2 shrink-0" />

        {/* Header */}
        <div className="flex justify-between items-center px-6 pb-4 shrink-0">
          <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
          <button
            onClick={handleReset}
            className="text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-8 no-scrollbar">
          {/* ── Vehicle Type ──────────────────────── */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Vehicle Type</h3>
            <div className="grid grid-cols-3 gap-3">
              {vehicleTypeOptions.map((opt) => {
                const checked = filters.vehicleTypes.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleVehicleType(opt.id)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all h-24 ${
                      checked
                        ? "border-[#136dec] bg-[#136dec]/5"
                        : "border-gray-100 bg-gray-50 hover:border-gray-200"
                    }`}
                  >
                    <span
                      className={`material-icons text-3xl mb-1 ${
                        checked ? "text-[#136dec]" : "text-gray-400"
                      }`}
                    >
                      {opt.icon}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        checked ? "text-[#136dec]" : "text-gray-600"
                      }`}
                    >
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* ── Price Range ───────────────────────── */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-gray-900">Price Range (Daily)</h3>
              <span className="text-[#136dec] font-bold text-sm">
                ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </span>
            </div>
            {/* Dual range slider */}
            <div className="relative h-12 pt-4">
              {/* Track background */}
              <div className="absolute top-5 left-0 right-0 h-1.5 bg-gray-100 rounded-full" />
              {/* Active track */}
              <div
                className="absolute top-5 h-1.5 bg-[#136dec] rounded-full"
                style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
              />
              {/* Min handle */}
              <div
                className="absolute top-3 w-6 h-6 bg-white border-2 border-[#136dec] rounded-full shadow cursor-grab"
                style={{ left: `calc(${minPercent}% - 12px)` }}
              />
              {/* Max handle */}
              <div
                className="absolute top-3 w-6 h-6 bg-white border-2 border-[#136dec] rounded-full shadow cursor-grab"
                style={{ left: `calc(${maxPercent}% - 12px)` }}
              />
              {/* Invisible range inputs stacked on top */}
              <input
                type="range"
                min={10}
                max={300}
                step={5}
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(0, Number(e.target.value))}
                className="absolute top-2 left-0 w-full h-8 opacity-0 cursor-grab z-10"
                aria-label="Minimum price"
              />
              <input
                type="range"
                min={10}
                max={300}
                step={5}
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(1, Number(e.target.value))}
                className="absolute top-2 left-0 w-full h-8 opacity-0 cursor-grab z-20"
                aria-label="Maximum price"
              />
            </div>
          </section>

          {/* ── Fuel & Engine ─────────────────────── */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Fuel &amp; Engine</h3>
            <div className="space-y-3">
              {fuelOptions.map((opt) => {
                const checked = filters.fuelTypes.includes(opt.id);
                return (
                  <label
                    key={opt.id}
                    className="flex items-center justify-between group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-full ${opt.iconBg} flex items-center justify-center ${opt.iconColor}`}
                      >
                        <span className="material-icons text-lg">{opt.icon}</span>
                      </span>
                      <span className="text-sm font-medium text-gray-700">{opt.label}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleFuelType(opt.id)}
                      className="w-5 h-5 text-[#136dec] border-gray-300 rounded focus:ring-[#136dec]"
                    />
                  </label>
                );
              })}
            </div>
          </section>

          {/* ── Transmission ──────────────────────── */}
          <section>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Transmission</h3>
            <div className="flex gap-4">
              {["automatic", "manual"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilters((prev) => ({ ...prev, transmission: type }))}
                  className={`flex-1 py-2.5 px-4 rounded-lg border text-center text-sm font-medium transition-colors ${
                    filters.transmission === type
                      ? "bg-[#136dec] text-white border-[#136dec]"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Footer */}
        <div className="px-6 py-4 border-t border-gray-100 shrink-0">
          <button
            onClick={handleApply}
            className="w-full bg-[#136dec] hover:bg-[#0f5bbd] text-white font-bold py-4 rounded-xl shadow-lg shadow-[#136dec]/30 transition-all flex items-center justify-center gap-2"
          >
            Show 24 Vehicles
          </button>
        </div>
      </div>
    </div>
  );
}

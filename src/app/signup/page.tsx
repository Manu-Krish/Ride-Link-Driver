"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { EyeIcon, EyeSlashIcon, SpinnerIcon } from "@/components/ui/Icons";
import PasswordStrength from "@/components/ui/PasswordStrength";
import { ToastContainer, useToast } from "@/components/ui/Toast";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    acceptMarketing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const { toasts, addToast, removeToast } = useToast();
  const nameInputRef = useRef<HTMLInputElement>(null);

  const formatPhoneNumber = (value: string): string => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(value) }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!phoneDigits) {
      newErrors.phone = "Phone number is required";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast("Please fix the errors below", "error");
      return;
    }
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    addToast("Account created successfully! Welcome aboard.", "success");
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-400 focus:border-red-500 focus:ring-red-200"
        : "border-gray-200 hover:border-gray-300 focus:border-[#064E3B] focus:ring-[#064E3B]/20"
    }`;

  return (
    <div className="flex min-h-screen">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Left Panel — Branding */}
      <div className="relative hidden w-[45%] overflow-hidden bg-[#064E3B] lg:flex lg:flex-col lg:justify-between">
        {/* Decorative circles */}
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/5" />
        <div className="absolute right-12 top-1/3 h-40 w-40 rounded-full bg-white/5" />

        <div className="relative z-10 flex flex-1 flex-col justify-center px-12">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
            <svg
              className="h-8 w-8 text-emerald-300"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H18m-15.75 0h.008v.015H2.25V18.75ZM21.75 9l-1.5 1.5m0 0-3-3.5L12 12l-3-3-4.5 4.5M18 12.75h.008v.008H18V12.75Zm-6-6h.008v.008H12V6.75Z"
              />
            </svg>
          </div>
          <h2 className="mb-4 text-4xl font-bold leading-tight text-white">
            Start your journey
            <br />
            with Ride Link
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-emerald-200/80">
            Join thousands of drivers earning on their own schedule. Fast onboarding, reliable
            payouts, 24/7 support.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3">
            {["Instant Payouts", "Flexible Hours", "24/7 Support", "GPS Navigation"].map((f) => (
              <span
                key={f}
                className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-emerald-100 backdrop-blur-sm"
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10 border-t border-white/10 px-12 py-8">
          <p className="mb-3 text-sm italic leading-relaxed text-emerald-100/90">
            &ldquo;Ride Link made it incredibly easy to start driving and earning. The app is
            intuitive and support is top-notch.&rdquo;
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/20 text-sm font-bold text-emerald-300">
              AK
            </div>
            <div>
              <p className="text-sm font-medium text-white">Arjun K.</p>
              <p className="text-xs text-emerald-300/70">Driver since 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 px-6 py-10">
        <div className="w-full max-w-[460px] animate-fade-in">
          {/* Mobile-only branding */}
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#064E3B] shadow-md shadow-emerald-200">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H18m-15.75 0h.008v.015H2.25V18.75ZM21.75 9l-1.5 1.5m0 0-3-3.5L12 12l-3-3-4.5 4.5M18 12.75h.008v.008H18V12.75Zm-6-6h.008v.008H12V6.75Z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Ride Link</span>
          </div>

          {/* Mobile header */}
          <div className="mb-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#064E3B]"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Back to home
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
            <p className="mt-2 text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-[#064E3B] hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label
                htmlFor="signup-name"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>
              <input
                ref={nameInputRef}
                type="text"
                id="signup-name"
                name="name"
                autoFocus
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className={inputClass("name")}
                placeholder="John Doe"
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-1.5 text-sm text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="signup-email"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="signup-email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass("email")}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1.5 text-sm text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="signup-phone"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="signup-phone"
                name="phone"
                autoComplete="tel"
                value={formData.phone}
                onChange={handleChange}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className={inputClass("phone")}
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p id="phone-error" role="alert" className="mt-1.5 text-sm text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="signup-password"
                  name="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : "password-strength"}
                  className={`${inputClass("password")} !pr-12`}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" role="alert" className="mt-1.5 text-sm text-red-600">
                  {errors.password}
                </p>
              )}
              <div
                id="password-strength"
                className={`overflow-hidden transition-all duration-300 ${
                  passwordFocused || formData.password
                    ? "max-h-60 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <PasswordStrength password={formData.password} />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm-password"
                className="mb-1.5 block text-sm font-semibold text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="signup-confirm-password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                  className={`${inputClass("confirmPassword")} !pr-12`}
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p id="confirm-password-error" role="alert" className="mt-1.5 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms */}
            <div className="space-y-3 rounded-xl bg-gray-100/70 p-4">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  aria-invalid={!!errors.acceptTerms}
                  aria-describedby={errors.acceptTerms ? "terms-error" : undefined}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/20"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-[#064E3B] underline decoration-dotted underline-offset-2 hover:decoration-solid"
                  >
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#064E3B] underline decoration-dotted underline-offset-2 hover:decoration-solid"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.acceptTerms && (
                <p id="terms-error" role="alert" className="text-sm text-red-600">
                  {errors.acceptTerms}
                </p>
              )}

              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="acceptMarketing"
                  checked={formData.acceptMarketing}
                  onChange={handleChange}
                  className="mt-0.5 h-4 w-4 rounded border-gray-300 text-[#064E3B] focus:ring-2 focus:ring-[#064E3B]/20"
                />
                <span className="text-sm text-gray-500">
                  Send me updates about features and promotions
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#064E3B] px-4 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-900/20 transition-all duration-200 hover:bg-[#065f46] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[#064E3B]/50 focus:ring-offset-2 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <SpinnerIcon className="h-5 w-5" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-gray-400">
            By signing up, you agree to our terms. We&apos;ll occasionally send you account-related
            emails.
          </p>
        </div>
      </div>
    </div>
  );
}

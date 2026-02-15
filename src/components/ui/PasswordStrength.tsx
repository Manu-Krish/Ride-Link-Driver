"use client";

import { useMemo } from "react";

interface PasswordStrengthProps {
  password: string;
}

interface StrengthCheck {
  label: string;
  met: boolean;
}

function getStrengthChecks(password: string): StrengthCheck[] {
  return [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Contains lowercase letter", met: /[a-z]/.test(password) },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Contains special character", met: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];
}

function getStrengthLevel(checks: StrengthCheck[]): {
  score: number;
  label: string;
  color: string;
  bgColor: string;
} {
  const met = checks.filter((c) => c.met).length;
  if (met <= 1) return { score: met, label: "Weak", color: "bg-red-500", bgColor: "text-red-600" };
  if (met <= 2)
    return { score: met, label: "Fair", color: "bg-orange-500", bgColor: "text-orange-600" };
  if (met <= 3)
    return { score: met, label: "Good", color: "bg-yellow-500", bgColor: "text-yellow-600" };
  if (met <= 4)
    return { score: met, label: "Strong", color: "bg-emerald-500", bgColor: "text-emerald-600" };
  return {
    score: met,
    label: "Very Strong",
    color: "bg-emerald-600",
    bgColor: "text-emerald-700",
  };
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const checks = useMemo(() => getStrengthChecks(password), [password]);
  const strength = useMemo(() => getStrengthLevel(checks), [checks]);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2" role="status" aria-label="Password strength">
      {/* Strength Bar */}
      <div className="flex items-center gap-2">
        <div className="flex flex-1 gap-1">
          {[1, 2, 3, 4, 5].map((level) => (
            <div
              key={level}
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                level <= strength.score ? strength.color : "bg-gray-200"
              }`}
            />
          ))}
        </div>
        <span className={`text-xs font-medium ${strength.bgColor}`}>{strength.label}</span>
      </div>

      {/* Requirements List */}
      <ul className="space-y-1">
        {checks.map((check) => (
          <li key={check.label} className="flex items-center gap-2 text-xs">
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full transition-all duration-200 ${
                check.met ? "bg-emerald-100 text-emerald-600" : "bg-gray-100 text-gray-400"
              }`}
            >
              {check.met ? "✓" : "·"}
            </span>
            <span className={check.met ? "text-emerald-700" : "text-gray-500"}>{check.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

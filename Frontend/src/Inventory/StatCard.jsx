import React from 'react'

export default function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white p-6 rounded-xl border">
      <p className="text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      <p className="text-sm text-green-500 mt-1">{subtitle}</p>
    </div>
  );
}




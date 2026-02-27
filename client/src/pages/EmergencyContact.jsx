import React from "react"
import { useNavigate } from "react-router-dom"

const EmergencyContact = () => {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-red-600 mb-6">🚨 Emergency Contact</h1>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Details of a designated individual to be contacted in case of emergency</h2>
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Contact Details</h2>
        <p className="text-gray-700 mb-2">
          <strong>Name:</strong> John Doe
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Phone:</strong>{" "}
          <a href="tel:+1234567890" className="text-blue-600 hover:underline">
            +1 234 567 890
          </a>
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:emergency@support.com"
            className="text-blue-600 hover:underline"
          >
            emergency@support.com
          </a>
        </p>

        <p className="text-gray-700 mt-4">
          For urgent matters, use your emergency contact information.
        </p>

        {/* <a
          href="https://meet.google.com/your-meet-link" // ✅ replace with your real Meet link
          target="_blank"
          rel="noreferrer"
          className="inline-block mt-4 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
        >
          Join Google Meet
        </a> */}
      </div>

      <button
        onClick={() => navigate(-1)} // Go back to previous page
        className="mt-6 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
      >
        ⬅ Back
      </button>
    </div>
  )
}

export default EmergencyContact

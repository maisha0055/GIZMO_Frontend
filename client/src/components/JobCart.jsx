import React from "react";
import { useNavigate } from "react-router-dom";
import "./JobCart.css";

const JobCart = ({ job }) => {
  const navigate = useNavigate();

  const cleanDescription = job.description
    ? job.description.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 100)
    : "";

  const birds = Array.from({ length: 8 });

  return (
    <div className='bg-white p-6 shadow-sm border border-gray-100 rounded-2xl hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 transition-all duration-300 group cursor-pointer'>
      {/* Clouds */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-[#7ff3d8] rounded-full blur-3xl opacity-40 animate-float-slow"></div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-yellow-200 rounded-full blur-2xl opacity-40 animate-float"></div>
      <div className="absolute top-10 right-10 w-16 h-16 bg-emerald-500 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>

      {/* Birds */}
      {birds.map((_, index) => {
        const size = 10 + Math.random() * 20;
        const duration = 8 + Math.random() * 8;
        const delay = Math.random() * 5;
        const startY = Math.random() * 80;
        const rotation = Math.random() * 30 - 15;

        return (
          <svg
            key={index}
            className="bird"
            width={size}
            height={size}
            style={{
              top: `${startY}%`,
              left: `-50px`,
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              opacity: 0.6 + Math.random() * 0.4,
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#808080" // light green
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Better bird shape */}
            <path d="M2 12 L6 8 L10 12 L14 8 L20 20" />
          </svg>


        );
      })}

      {/* Header */}
      <div className="header">
        <div className="company-logo">
          <img src={job.companyId.image} alt={job.companyId.name} />
        </div>
        <div>
          <h3>{job.title}</h3>
          <p>{job.companyId.name}</p>
        </div>
      </div>

      {/* Info Row */}
      <div className="info-row">
        <div>{job.location}</div>
        <div>{job.level}</div>
      </div>

      {/* Description */}
      <p>{cleanDescription}...</p>

      {/* Action Buttons */}
      <div className="actions">
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Apply Now
        </button>
        <button
          onClick={() => {
            navigate(`/apply-job/${job._id}`);
            scrollTo(0, 0);
          }}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

export default JobCart;




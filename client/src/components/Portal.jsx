import React from 'react'

const Portal = () => {
  const cards = [
    {
      title: "Job Market Insights",
      subtitle: "INDUSTRY REPORT",
      description: "Latest trends and hiring demands shaping the global job market.",
      link: "https://www.linkedin.com/pulse/topics/job-search",
      linkText: "Read Report →"
    },
    {
      title: "Company Innovation Spotlight",
      subtitle: "INDUSTRY NEWS",
      description: "Discover how leading companies are transforming industries with innovation.",
      link: "https://www.businessinsider.com/cluster/markets",
      linkText: "Read Article →"
    },
    {
      title: "Research on Work & Careers",
      subtitle: "JOURNAL STUDY",
      description: "Academic research exploring workforce development and industry practices.",
      link: "https://scholar.google.com/",
      linkText: "Read Journal →"
    }
  ]

  return (
    <div className='bg-gradient-to-r from-green-800 to-yellow-200 text-white py-2 text-center mx-2 rounded-xl'>
      {/* Heading */}
      <h2 className="text-3xl font-bold text-yellow-900 mb-2">Jobs & Industry News</h2>
      <p className="text-yellow-800 mb-8">
        Stay updated with the latest job market research, industry developments, and career insights.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <p className="text-xs font-medium text-gray-500 mb-2">{card.subtitle}</p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{card.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{card.description}</p>
            <a
              href={card.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 font-medium hover:underline"
            >
              {card.linkText}
            </a>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-8 text-sm text-yellow-900 flex items-center justify-center gap-2">
        <span>➝</span> You are welcome, please explore our resources
      </div>
    </div>
  )
}

export default Portal

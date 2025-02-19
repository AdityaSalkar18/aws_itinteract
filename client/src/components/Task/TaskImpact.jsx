import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale);


const TaskImpact = () => {

  const [replies, setReplies] = useState([]);
  const [chartData, setChartData] = useState({});
  const [subdomainAverages, setSubdomainAverages] = useState([]);

  // Color mapping for subdomains
  const colorMapping = {
    "FrontendDevelopment": "#FF6384",
    "BackendDevelopment": "#36A2EB",
    "FullStackDevelopment": "#FFCE56",
    "MobileAppDevelopment": "#4BC0C0",
    "DataAnalysis": "#9966FF",
    "MachineLearning": "#FF9F40",
    "ArtificialIntelligence": "#FF5733",
    "DataEngineering": "#F1C40F",
    "SecurityAnalysis": "#2ECC71",
    "EthicalHacking": "#E74C3C",
    "IncidentResponse": "#1ABC9C",
    "Governance": "#8E44AD",
    "DatabaseAdministration": "#349858",
    "DatabaseDevelopment": "#9B59B6",
    "CloudEngineering": "#F39C12",
    "CloudArchitecture": "#2C3E50",
    "CloudSecurity": "#D35400",
    "CloudAdministration": "#16A085",
  };

  // Domains and their respective subdomains
  const domains = {
    SoftwareDevelopment: ["FrontendDevelopment", "BackendDevelopment", "FullStackDevelopment", "MobileAppDevelopment"],
    DataScience: ["DataAnalysis", "MachineLearning", "ArtificialIntelligence", "DataEngineering"],
    Cybersecurity: ["SecurityAnalysis", "EthicalHacking", "IncidentResponse", "Governance"],
    DatabaseManagement: ["DatabaseAdministration", "DataEngineering", "DatabaseDevelopment", "DataAnalysis"],
    CloudComputing: ["CloudEngineering", "CloudArchitecture", "CloudSecurity", "CloudAdministration"],
  };

  useEffect(() => {
    // Fetch the replies from the backend
    const fetchReplies = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:8080/api/reply/myreply", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setReplies(response.data);
        generateChartData(response.data); // Generate chart data based on the replies
      } catch (error) {
        console.error("Error fetching replies:", error);
      }
    };

    fetchReplies();
  }, []);

  // Function to calculate average replies and generate chart data for each domain
  const generateChartData = (data) => {
    const domainChartData = {};
    const subdomainData = {};
    const subdomainAvgData = [];

    // Initialize subdomain data for each domain
    Object.keys(domains).forEach((domain) => {
      domainChartData[domain] = {
        labels: [],
        data: [],
        colors: [],
      };
    });

    // Calculate sum and count for each subdomain
    Object.values(domains).flat().forEach((subdomain) => {
      subdomainData[subdomain] = { sum: 0, count: 0 };
    });

    data.forEach((reply) => {
      if (subdomainData[reply.linksd]) {
        subdomainData[reply.linksd].sum += parseFloat(reply.reply);
        subdomainData[reply.linksd].count += 1;
      }
    });

    // Calculate average and organize data by domain
    Object.entries(subdomainData).forEach(([subdomain, { sum, count }]) => {
      if (count > 0) {
        Object.entries(domains).forEach(([domain, subdomains]) => {
          if (subdomains.includes(subdomain)) {
            domainChartData[domain].labels.push(subdomain);
            domainChartData[domain].data.push(sum / count); // Calculate average
            domainChartData[domain].colors.push(colorMapping[subdomain] || "#D3D3D3");
            subdomainAvgData.push({ subdomain, average: (sum / count).toFixed(2) });
          }
        });
      }
    });

    setChartData(domainChartData);
    setSubdomainAverages(subdomainAvgData); // Set the subdomain averages for the table
  };

  
    return(
        <div>
          <div className="container mx-auto mt-5 py-5">
  <h1 className="mb-5 mt-5 text-center text-2xl font-bold text-black">
    Task Impact
  </h1>

  {/* Grid container for 2 rows and 2 columns layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* First Row */}
    {Object.entries(chartData).slice(0, 2).map(([domain, { labels, data, colors }]) => (
      <div
        key={domain}
        className="flex justify-center items-center"
      >
        <div className="w-[300px] h-[300px]">
          <h2 className="text-center text-lg font-semibold text-gray-800">{domain}</h2>
          {labels.length > 0 ? (
            <Pie
              data={{
                labels,
                datasets: [
                  {
                    data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`,
                    },
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
              }}
              width={300} // Width of the pie chart
              height={300} // Height of the pie chart
            />
          ) : (
            <p className="text-center">No data available for this domain.</p>
          )}
        </div>
      </div>
    ))}

    {/* Second Row */}
    {Object.entries(chartData).slice(2, 4).map(([domain, { labels, data, colors }]) => (
      <div
        key={domain}
        className="flex justify-center items-center mt-5"
      >
        <div className="w-[300px] h-[300px]">
          <h2 className="text-center text-lg font-semibold text-gray-800">{domain}</h2>
          {labels.length > 0 ? (
            <Pie
              data={{
                labels,
                datasets: [
                  {
                    data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`,
                    },
                  },
                  legend: {
                    display: true,
                    position: "top",
                  },
                },
              }}
              width={300} // Width of the pie chart
              height={300} // Height of the pie chart
            />
          ) : (
            <p className="text-center">No data available for this domain.</p>
          )}
        </div>
      </div>
    ))}
  </div>

  {/* Third Row - Centered chart */}
  <div className="flex justify-center">
    {Object.entries(chartData).length > 4 && (
      <div className="w-[300px] h-[300px] mt-5">
        <h2 className="text-center text-lg font-semibold text-gray-800">
          {Object.entries(chartData)[4][0]} {/* Display the domain name of the 5th chart */}
        </h2>
        {Object.entries(chartData)[4][1].labels.length > 0 ? (
          <Pie
            data={{
              labels: Object.entries(chartData)[4][1].labels,
              datasets: [
                {
                  data: Object.entries(chartData)[4][1].data,
                  backgroundColor: Object.entries(chartData)[4][1].colors,
                  borderColor: Object.entries(chartData)[4][1].colors,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw.toFixed(2)}`,
                  },
                },
                legend: {
                  display: true,
                  position: "top",
                },
              },
            }}
            width={300} // Width of the pie chart
            height={300} // Height of the pie chart
          />
        ) : (
          <p className="text-center">No data available for this domain.</p>
        )}
      </div>
    )}
  </div>

  {/* Table with Raw Reply Data */}
  <div className="mt-10">
    <h2 className="text-center text-lg font-semibold text-gray-800">Task Feedback Data</h2>
    <table className="table-auto w-full mt-5 border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Subdomain</th>
          <th className="border border-gray-300 p-2">Task Impact</th>
          <th className="border border-gray-300 p-2">Feedback By</th> {/* Adjust this field as needed */}
        </tr>
      </thead>
      <tbody>
        {replies.map((reply, index) => (
          <tr key={index} className="odd:bg-white even:bg-gray-50">
            <td className="border border-gray-300 p-2">{reply.linksd}</td>
            <td className="border border-gray-300 p-2">{reply.reply}</td>
            <td className="border border-gray-300 p-2">{reply.name}</td> {/* Adjust this field as needed */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

        </div>
    )
}

export default TaskImpact

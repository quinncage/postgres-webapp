import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [results, setResults] = useState([]); // State for fetched results
  const [currentQuery, setCurrentQuery] = useState(''); // State for current query label

  // Function to fetch data for a given endpoint
  const fetchData = async (endpoint, label) => {
    try {
      const response = await axios.get(`http://localhost:5000/${endpoint}`);
      setResults(response.data); // Update results state with fetched data
      setCurrentQuery(label); // Update current query label
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      alert(`Could not fetch data from ${label}. Please check the backend.`);
    }
  };

  // Function to format results based on the current query
  const renderResults = () => {
    if (results.length === 0) {
      return <p>No results to display</p>;
    }

    switch (currentQuery) {
      case 'Favorites':
        return results.map((item, index) => (
          <li key={index}>
            User ID: {item.userid}, Restaurant ID: {item.restaurantid}
          </li>
        ));
      case 'Menu Items':
        return results.map((item, index) => (
          <li key={index}>
            <strong>{item.itemname}</strong> - Category: {item.itemcategory1}, Price: ${item.price}, Happy Price: ${item.happyprice}
          </li>
        ));
      case 'Operating Hours':
        return results.map((item, index) => (
          <li key={index}>
            Restaurant ID: {item.restaurantid}, Hours: {item.hours}
          </li>
        ));
      case 'Restaurants':
        return results.map((item, index) => (
          <li key={index}>
            <strong>{item.rname}</strong> - Address: {item.address}, Cuisine: {item.cuisinename}, Rating: {item.averagerating}
          </li>
        ));
      case 'Users':
        return results.map((item, index) => (
          <li key={index}>
            User ID: {item.userid}, Name: {item.name}, Email: {item.email}
          </li>
        ));
      default:
        return results.map((item, index) => <li key={index}>{JSON.stringify(item)}</li>);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Database Queries</h1>

      {/* Buttons for each query */}
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => fetchData('favorites', 'Favorites')} style={{ margin: '5px', padding: '10px 20px' }}>
          Fetch Favorites
        </button>
        <button onClick={() => fetchData('menuitems', 'Menu Items')} style={{ margin: '5px', padding: '10px 20px' }}>
          Fetch Menu Items
        </button>
        <button onClick={() => fetchData('operatinghours', 'Operating Hours')} style={{ margin: '5px', padding: '10px 20px' }}>
          Fetch Operating Hours
        </button>
        <button onClick={() => fetchData('restaurants', 'Restaurants')} style={{ margin: '5px', padding: '10px 20px' }}>
          Fetch Restaurants
        </button>
        <button onClick={() => fetchData('users', 'Users')} style={{ margin: '5px', padding: '10px 20px' }}>
          Fetch Users
        </button>
      </div>

      {/* Results Section */}
      <div>
        <h2>Results for: {currentQuery}</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>{renderResults()}</ul>
      </div>
    </div>
  );
};

export default Home;

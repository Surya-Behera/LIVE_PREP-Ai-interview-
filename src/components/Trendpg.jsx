import React, { useState, useEffect } from 'react';

const Trendpg = () => {
  const [data1, setData1] = useState('');
  const [data2, setData2] = useState('');
  const [data3, setData3] = useState('');

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const url1 = 'https://your-django-backend-api-endpoint1';
    const url2 = 'https://your-django-backend-api-endpoint2';
    const url3 = 'https://your-django-backend-api-endpoint3';

    fetchData(url1, setData1);
    fetchData(url2, setData2);
    fetchData(url3, setData3);
  }, []); // Empty dependency array ensures that the effect runs only once when the component mounts

  return (
    <div>
      <label>Data from URL 1:</label>
      <input type="text" value={data1} readOnly />

      <label>Data from URL 2:</label>
      <input type="text" value={data2} readOnly />

      <label>Data from URL 3:</label>
      <input type="text" value={data3} readOnly />
    </div>
  );
};

export default Trendpg;

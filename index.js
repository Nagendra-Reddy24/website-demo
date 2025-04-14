const imageMap = {
    "Sunny": "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1470&q=80",
    "Rain": "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=1470&q=80",
    "Cloudy": "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1470&q=80",
    "Snow": "https://images.unsplash.com/photo-1608889176163-94f7b64f12b9?auto=format&fit=crop&w=1470&q=80",
    "Clear": "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1470&q=80",
    "Overcast": "https://images.unsplash.com/photo-1508873699372-7aeab60b44b6?auto=format&fit=crop&w=1470&q=80"
  };
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      document.getElementById('loader').style.display = 'none';
      document.querySelector('.weather-container').style.display = 'block';
      document.querySelector('footer').style.display = 'block';
    }, 2000);
  });
  
  async function getWeather() {
    const location = document.getElementById('locationInput').value;
    const resultDiv = document.getElementById('weatherResult');
  
    if (!location) {
      resultDiv.innerHTML = 'Please enter a location.';
      return;
    }
  
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=7a207a815c944e9889464718251404&q=${location}&aqi=yes`);
      const data = await response.json();
  
      if (data.error) {
        resultDiv.innerHTML = `Error: ${data.error.message}`;
      } else {
        const condition = data.current.condition.text;
        resultDiv.innerHTML = `The temperature in <strong>${data.location.name}</strong> is <strong>${data.current.temp_c}&deg;C</strong>. Weather: <strong>${condition}</strong>`;
  
        let backgroundSet = false;
        for (let keyword in imageMap) {
          if (condition.toLowerCase().includes(keyword.toLowerCase())) {
            document.body.style.backgroundImage = `url('${imageMap[keyword]}')`;
            backgroundSet = true;
            break;
          }
        }
        if (!backgroundSet) {
          document.body.style.backgroundImage = 'none';
        }
      }
    } catch (error) {
      resultDiv.innerHTML = 'Failed to fetch weather data. Please try again later.';
    }
  }
  
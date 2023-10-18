(function(window) {
    // Get the current URL
    var url = encodeURIComponent(window.location.href);
    
    var mainDiv = document.createElement('div');
    mainDiv.className = 'bg-[#F4F4F4] w-fit border-2 border-black mt-6 sm:mt-0';

    // Create the first inner div
    var firstDiv = document.createElement('div');
    firstDiv.className = 'flex flex-row px-6 py-6 sm:flex-col items-center';

    // Create the h4 elements for the first inner div
    var h4_1 = document.createElement('h4');
    h4_1.className = 'text-sm';
    h4_1.textContent = 'Cette page émet';

    var h4_2 = document.createElement('h4');
    h4_2.className = 'text-lg font-bold ml-3 sm:ml-0';
    h4_2.textContent = '1,56 g de CO2e';

    // Append the h4 elements to the first inner div
    firstDiv.appendChild(h4_1);
    firstDiv.appendChild(h4_2);

    // Create the second inner div
    var secondDiv = document.createElement('div');
    secondDiv.className = 'flex flex-row px-6 py-6 pr-6 border-t-2 border-black sm:flex-col items-center';

    // Create the h4 element and img for the second inner div
    var h4_3 = document.createElement('h4');
    h4_3.className = 'text-sm';
    h4_3.textContent = 'Le score Meexr du site est';

    var img = document.createElement('img');
    img.src = './global_audit.svg';
    img.alt = '';
    img.className = 'ml-3 sm:ml-0 sm:mt-1';

    // Append the h4 element and img to the second inner div
    secondDiv.appendChild(h4_3);
    secondDiv.appendChild(img);

    // Append the inner divs to the main div
    mainDiv.appendChild(firstDiv);
    mainDiv.appendChild(secondDiv);

    // Append the main div to the body
    document.body.appendChild(mainDiv);

    // Append the badge to the body of the webpage
    // Define the API endpoint
    var apiEndpoint = 'https://your-backend-service.com/api?u=' + url;
  
    // Fetch the carbon footprint from your backend service
    /*fetch(apiEndpoint)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        // Create a new element for the badge
        var badge = document.createElement('div');
  
        // Set the text and style of the badge
        badge.textContent = data.footprint + 'g of CO2 per view';
        badge.className = 'bg-green-500 text-white p-4';
  
        // Append the badge to the body of the webpage
        document.body.appendChild(badge);
      })
      .catch(function(error) {
        console.log('Request failed: ' + error.message);
      });*/
  })(window);
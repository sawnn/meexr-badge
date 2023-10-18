(function(window) {
    var url = encodeURIComponent(window.location.href);
    
    var mainDiv = document.createElement('div');
    mainDiv.className = 'bg-[#F4F4F4] w-fit border-2 border-black mt-6 sm:mt-0';

    var firstDiv = document.createElement('div');
    firstDiv.className = 'flex flex-row px-6 py-6 sm:flex-col items-center';


    var h4_1 = document.createElement('h4');
    h4_1.className = 'text-sm';
    h4_1.textContent = 'Cette page émet';

    var h4_2 = document.createElement('h4');
    h4_2.className = 'text-lg font-bold ml-3 sm:ml-0';
    h4_2.textContent = '1,56 g de CO2e';

    firstDiv.appendChild(h4_1);
    firstDiv.appendChild(h4_2);

    var secondDiv = document.createElement('div');
    secondDiv.className = 'flex flex-row px-6 py-6 pr-6 border-t-2 border-black sm:flex-col items-center';

    var h4_3 = document.createElement('h4');
    h4_3.className = 'text-sm';
    h4_3.textContent = 'Le score Meexr du site est';

    var img = document.createElement('img');
    img.src = 'https://sawnn.github.io/meexr-badge/global_audit.svg';
    img.alt = '';
    img.className = 'ml-3 sm:ml-0 sm:mt-1';

    secondDiv.appendChild(h4_3);
    secondDiv.appendChild(img);

    mainDiv.appendChild(firstDiv);
    mainDiv.appendChild(secondDiv);

    document.body.appendChild(mainDiv);

  
    var apiEndpoint = 'https://your-backend-service.com/api?u=' + url;
  
    /*fetch(apiEndpoint)
      .then(function(response) {
        if (!response.ok) {
          throw new Error('HTTP error ' + response.status);
        }
        return response.json();
      })
      .then(function(data) {
        var badge = document.createElement('div');
  
        badge.textContent = data.footprint + 'g of CO2 per view';
        badge.className = 'bg-green-500 text-white p-4';
  
        document.body.appendChild(badge);
      })
      .catch(function(error) {
        console.log('Request failed: ' + error.message);
      });*/
  })(window);
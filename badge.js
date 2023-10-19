

const getIcone = (score) => {
  if (score < 25) {
      return "https://sawnn.github.io/meexr-badge/score_d.svg"
  }
  if (score < 50) {
      return "https://sawnn.github.io/meexr-badge/score_c.svg"
  }
  if (score < 75) {
      return "https://sawnn.github.io/meexr-badge/score_b.svg"
  }
  return "https://sawnn.github.io/meexr-badge/score_a.svg"
}

const getColor = (score) => {
  if (score < 25) {
      return "text-scoreRed"
  }
  if (score < 50) {
      return "text-scoreOrange"
  }
  if (score < 75) {
      return "text-scoreBlue"
  }
  return "text-scoreGreen"
}

const getLetter = (score) => {
  if (score < 25) {
      return "D"
  }
  if (score < 50) {
      return "C"
  }
  if (score < 75) {
      return "B"
  }
  return "A"
}

function getBadgeHTML(footprint, score) {
    return `
    <div class="bg-[#F4F4F4] w-fit border-2 border-black mt-6 sm:mt-0">
        <div class="flex flex-row px-6 py-6 sm:flex-col items-center">
            <h4 class="text-sm mr-2 sm:mr-0">Cette page émet</h4>
            <h4 class="text-lg font-bold ml-3 sm:ml-0">${footprint.toFixed(2)} g de CO2e par visite</h4>
        </div>
        <div class="flex flex-row px-6 py-6 pr-6 border-t-2 border-black sm:flex-col items-center">
            <h4 class="text-sm mr-2 sm:mr-0">Le score Meexr du site est</h4>
            <div class="flex flex-row">
              <img src=${getIcone(score)} alt="" class="ml-3 sm:ml-0 sm:mt-1 h-[50px] w-[50px]"/>
              <h2 class="text-5xl font-bold px-3 ${getColor(score)}">${getLetter(score)}</h2>
              <h1 class=" font-bold text-5xl ${getColor(score)}"}>${score}</h1>
              <h1 class="text-3xl my-auto font-normal ${getColor(score)}">/100pts</h1>
            </div>
        </div>
    </div>
    `;
  }

// create a function that return html code that tell user that the badge is being loaded

function getLoadingBadgeHTML() {
  return `
  <div class="bg-[#F4F4F4] w-fit border-2 border-black mt-6 sm:mt-0">
      <div class="flex flex-row px-6 py-6 sm:flex-col items-center">
          <h4 class="text-sm">Loading...</h4>
          <h4 class="text-lg font-bold ml-3 sm:ml-0">...</h4>
      </div>
      <div class="flex flex-row px-6 py-6 pr-6 border-t-2 border-black sm:flex-col items-center">
          <h4 class="text-sm">Loading...</h4>
          <div class="flex flex-row">
            <h2 class=" font-bold px-3">...</h2>

          </div>
      </div>
  </div>
  `;
}   


function sendRequest(url, render = true) {
  var apiEndpoint = 'https://api.meexr.fr/audits/badge-audit?brand=societech&nbVisits=1&website=' + url;
  
  fetch(apiEndpoint)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('HTTP error ' + response.status);
      }
      
    
      
      return response.json();
    })
    .then(function(data) {
      if (render) {
        var badgeHTML = getBadgeHTML(data.co2, data.score);
        var badgeElement = document.getElementById('meexr-badge');
        badgeElement.innerHTML = badgeHTML;
        //document.body.appendChild(badgeHTML);
      }
      localStorage.setItem('mxr_' + url, JSON.stringify({t: new Date().getTime(), co2: data.co2, score: data.score}))
      

    })
    .catch(function(error) {
      console.log('Request failed: ' + error.message);
    });
}

(function(window) {
    var url = encodeURIComponent(window.location.href);

 




    /*var mainDiv = document.createElement('div');
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
    mainDiv.appendChild(secondDiv);*/

    //var badgeElement = document.getElementById('meexr-badge');
    //badgeElement.appendChild(mainDiv);
    //document.body.appendChild(mainDiv);
    let cachedResponse = localStorage.getItem('mxr_' + url)
    const t = new Date().getTime()

    // If there is a cached response, use it
    if (cachedResponse) {
      cachedResponse = JSON.parse(cachedResponse)
      var badgeHTML = getBadgeHTML(cachedResponse.co2, cachedResponse.score);
      if (t - cachedResponse.t > 86400000) {
        sendRequest(url, false)
      }
      var badgeElement = document.getElementById('meexr-badge');
      badgeElement.innerHTML = badgeHTML;
      //document.body.innerHTML = badgeHTML;

    // If no cached response, then fetch from API
    } else {
      var badgeElement = document.getElementById('meexr-badge');
      var badgeHTML = getLoadingBadgeHTML();
      badgeElement.innerHTML = badgeHTML;
      sendRequest(url)
    }

  

  })(window);
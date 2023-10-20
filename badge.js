

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
      return "#E5726B"
  }
  if (score < 50) {
      return "#F6A673"
  }
  if (score < 75) {
      return "#A19FE2"
  }
  return "#68A17E"
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
  <div style="background-color: #F4F4F4; width: fit-content; border: 2px solid black; " >
      <div style="display: flex; flex-direction: column; padding: 1.5rem; align-items: center;">
          <h4 style="font-size: 14px; margin: 0; margin-bottom: 10px; font-weight: normal">Cette page émet</h4>
          <h4 style="font-size: 18px; font-weight: bold; margin: 0;">${footprint.toFixed(2)} g de CO2e par visite</h4>
      </div>
      <div style="display: flex; flex-direction: column; padding: 1.5rem; border-top: 2px solid black; align-items: center;">
          <h4 style="font-size: 0.875rem; margin: 0; font-weight: normal">Le score Meexr du site est</h4>
          <div style="display: flex; flex-direction: row; margin-top:8px;">
            <img src=${getIcone(score)} alt="" style=" margin: 0; height: 30px; width: 30px;"/>
            <h2 style="font-size: 30px; margin: 0; margin-top: auto; margin-right: 8px; font-weight: bold; padding-left: 8px; color: ${getColor(score)};">${getLetter(score)}</h2>
            <h1 style="font-weight: bold; margin: 0; margin-top: auto; font-size: 22px; margin-bottom: 2px; color: ${getColor(score)};">${score}</h1>
            <h1 style="font-size: 13px; margin: 0; margin-top: auto; font-weight: normal; margin-bottom: 6px; color: ${getColor(score)};">/100pts</h1>
          </div>
      </div>
  </div>
  `;
}



function getLoadingBadgeHTML() {
  return `
  <div style="background-color: #F4F4F4; width: fit-content; border: 2px solid black; margin-top: 1.5rem;">
      <div style="display: flex; flex-direction: row; padding: 1.5rem; align-items: center;">
          <h4 style="font-size: 0.875rem; margin: 0;">Loading...</h4>
      </div>
      <div style="display: flex; flex-direction: row; padding: 1.5rem; border-top: 2px solid black; align-items: center;">
          <h4 style="font-size: 0.875rem; margin: 0;">Loading...</h4>

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
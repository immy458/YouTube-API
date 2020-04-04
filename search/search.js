
function check(){
var videoId;
var videoTitle ;

var x = document.forms["form"]["search"].value;
  if (x == "" || x==" ") {
      document.getElementById("results").style.display = "none";
  }
else
{
  const key = 'AIzaSyC-s7qt1-D8FyTGRMebBoLGMC1eF25tly8';
  var URL = 'https://www.googleapis.com/youtube/v3/search';   
  const videoList = document.getElementById('results');
  //youtube API sees all these info, so that it knows what kind of information you want to retrieve
 
  const options = {     //javascript object which contains properties and values
        key: key,
        part: "snippet",
        type: "video",
        q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
        maxResults: 6,
        order: "relevance",
        publishedAfter: "2011-01-01T00:00:00Z"
  };

  document.getElementById("results").style.display = "block";    

  let loadvideolist = function () {

    var esc = encodeURIComponent;
    URL1 = Object.keys(options)     //returns arrays of keys
      .map(k => esc(k) + '=' + esc(options[k]))
      .join('&');
    URL=URL+"?"+URL1;
    alert(URL);

  //console.log(URL);

    //use fetch to get HTTP request
    fetch(URL)
      .then(res => res.json())
      .then(data => {
    //    console.log("dataaaaaaaaaaaaa");
        console.log(data);
          const listItems =data.items;
          if (listItems) 
          {
              let output = '<ul style="list-style-type: none;">';
              
              listItems.forEach(item => 
              {
                    videoId = item.id.videoId;
            
                   videoTitle = item.snippet.title;
             
                  output += `
                      <li style="border:1px solid black"; >
                      <a href="//www.youtube.com/embed/${videoId}" style="color:black;cursor:pointer;">
                      <img src="http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg" height="120" id=${videoId}/>
                    ${videoTitle}
                      </li>
                      </a>
                      <br>
                  `;
              });
              output += '</ul>'; 
              // Output list
              videoList.innerHTML = output;
          }


      })
      .catch(err => console.log(err))

  }
  loadvideolist();
}

}

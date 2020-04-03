
function check(){
   var videoId;
        var videoTitle ;
           var i=0;
const videoList = document.getElementById('results');
 var x = document.forms["form"]["search"].value;
  if (x == "" || x==" ") {
      document.getElementById("results").style.display = "none";
  }
  else
  {
        
       var request = gapi.client.youtube.search.list({
            part: "snippet",
            type: "video",
            q: encodeURIComponent($("#search").val()).replace(/%20/g, "+"),
            maxResults: 6,
            order: "relevance",
            publishedAfter: "2011-01-01T00:00:00Z"
       }); 

   
      
       request.execute(function(response) {
              const listItems = response.result.items;
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

     }, function(err) { console.error("Execute error", err); });

        document.getElementById("results").style.display = "block";    
  }
}

function init() {
   
    gapi.client.setApiKey("AIzaSyC-s7qt1-D8FyTGRMebBoLGMC1eF25tly8");
    gapi.client.load("youtube", "v3", function() {  
     console.log("done");
    });
}


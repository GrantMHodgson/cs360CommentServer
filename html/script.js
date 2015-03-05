/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$("#cityfield").keyup(function(){
   $.getJSON("http://52.11.71.104/getcity?q="+$('#cityfield').val(),function(data){
      var tags;
      tags="<ul>";
      $.each(data, function(i,item){
          tags += "<li> "+data[i].city+"</li>";
      });
      tags += "</ul>";
      $("#txtHint").html(tags);
    })
    
    
            .done(function(){console.log('getJSON request succeeded!'); })
            .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log('getJSON request failed! '+ textStatus);
                    console.log("incoming "+jqXHR.responseText);
            })
            .always(function() {console.log('getJSON request ended!');
            })
            .complete(function() {console.log("complete");});
   
});

$('#button').click(function(e){
   var $v = $('#cityfield').val();
   $('#dispcity').text($v);
   console.log($v);
   e.preventDefault();
   var weatherUrl = "https://api.wunderground.com/api/f186930d863ed4b5/geolookup/conditions/q/UT/";
   weatherUrl += $v;
   weatherUrl += ".json";
   console.log(weatherUrl);
   var $info;
   $.ajax({
        url : weatherUrl,
        dataType : "jsonp",
        success : function(data) {
            console.log(data);
            var location = data['location']['city'];
            var temp = data['current_observation']['temperature_string'];
            var status = data['current_observation']['weather'];
            var tags= "<ul>";
            tags += "<li>Location: "+location + "</li>";
            tags += "<li>Temperature: "+ temp + "</li>";
            tags += "<li>Weather: "+ status + "</li>";
            tags += "</ul>";
            $("#weather").html(tags);
              }
   });
   
  
});


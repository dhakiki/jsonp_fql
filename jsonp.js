
var script = document.createElement('script');
//page_id, name, username, fan_count, description, pic_big, pic_cover, page_url, " +
//"company_overview, mission, products, website
var fql = "SELECT page_id, name, username, about, description, plot_outline, starring, screenplay_by, directed_by, produced_by, studio, release_date, fan_count, pic_cover, pic_square, page_url ";
fql += "FROM page ";
fql += "WHERE username = 'PixarUp' OR username = 'PixarMonstersInc' OR username = 'PixarFindingNemo' OR username = 'PixarRatatouille' "; 
fql += "ORDER BY fan_count";

script.src = "http://graph.facebook.com/fql?q=" + fql + "&callback=myFunction";
document.getElementsByTagName('head')[0].appendChild(script);


function myFunction(data) {
	for ( var i = 0; i < data.data.length; i++){
	var templateString = document.getElementById('fb-page-template').innerHTML;

	var template = Handlebars.compile(templateString);
	//console.log(data.data[i]);
	var html = template(data.data[i]);

	templateString = document.getElementById('extra-info-template').innerHTML;
	template = Handlebars.compile(templateString);
	//console.log(data.data[i]);
	var innerhtml = template(data.data[i]);

	document.getElementById('fb-page').innerHTML += html;
	document.getElementById('fb-page').innerHTML += "<button type=\"button\" class =\"moreinfo\"> MORE INFO</button>"
	document.getElementById('fb-page').innerHTML += "<div class= \"extrainfo\" style=\"display: none;\">" + innerhtml + "</div>";
	}
}

$('#fb-page').on('click','.moreinfo', function(e) {

console.log(e.currentTarget);
var $this = $(this);
var disp = $this.next('.extrainfo').css('display'); 
if (disp === 'none'){ //not displayed 
	console.log('clicked');
	$this.next('.extrainfo').slideDown(300);
	$this.html("LESS INFO");
	}
	else {//if (disp === 'block'){//displayed
		$this.next('.extrainfo').slideUp(300);
		$this.html("MORE INFO");
	}
});
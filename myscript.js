//1. 在console載入jQuery
var jq = document.createElement('script');
jq.src = "http://code.jquery.com/jquery-latest.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

function init() {
	var head_len = $("#players-table .players thead tr:eq(1) th").length

	if($("#players-table .players thead tr:eq(1) th:eq("+head_len+")").length === 0) {
		$("#players-table .players thead tr:eq(1)").append("<th on>EFF</th><th>H2H</th>");
	}

	for (i=0; i<25; i++) {
		var row = $("#players-table .players tbody tr:eq("+i+")");
		row.append("<td></td><td></td><td></td>");
	}
}

function update() {
	var i;

	for (i=0; i<25; i++) {
		var row = $("#players-table .players tbody tr:eq("+i+")");
		var fgma = $("td:eq(10)", row).text();
		var fgrate = $("td:eq(11)", row).text();
		var ftma = $("td:eq(12)", row).text();
		var ftrate = $("td:eq(13)", row).text();
		var threeptm = $("td:eq(14)", row).text();
		var pts = $("td:eq(15)", row).text();
		var reb = $("td:eq(16)", row).text();
		var ast = $("td:eq(17)", row).text();
		var st = $("td:eq(18)", row).text();
		var blk = $("td:eq(19)", row).text();
		var to = $("td:eq(20)", row).text();

		var fgm = fgma.split("/")[0];
		var fga = fgma.split("/")[1];
		var ftm = ftma.split("/")[0];
		var fta = ftma.split("/")[1];

		// EFF : (PTS + TRB + AST + STL + BLK) -(FGA-FGM)-(FTA-FTM)-TO
		var eff =  parseFloat(pts) + parseFloat(reb) + parseFloat(ast) + parseFloat(st) + parseFloat(blk) - parseFloat(fga) + parseFloat(fgm) - parseFloat(fta) + parseFloat(ftm) - parseFloat(to) + parseFloat(threeptm);
		
		eff = parseFloat(pts)/99.1 + parseFloat(reb)/42.2 + parseFloat(ast)/21.1 + parseFloat(st)/7.2 + parseFloat(blk)/4.8 - parseFloat(to)/15.1 - parseFloat(fga)/81.8 + parseFloat(fgm)/36.6 - parseFloat(fta)/24.3 + parseFloat(ftm)/18.5 + parseFloat(threeptm)/7.4

		var h2h = parseFloat(blk)/4.8 + parseFloat(pts)/99.1 + parseFloat(reb)/42.2 + parseFloat(ast)/21.1 + parseFloat(st)/7.2 - parseFloat(fta)/24.3 + parseFloat(ftm)/18.5 + parseFloat(threeptm)/7.4


		$("td:eq(22)", row).html((eff*100).toFixed(1));
		$("td:eq(23)", row).html((h2h*100).toFixed(1));		
	}

}

// Points: 10.2
// Field Goal Percentage: 44.7%
// Free Throw Percentage: 73.2%
// 3-pointers: 0.78
// Rebounds: 4.3
// Assists: 2.2
// Steals: 0.75
// Blocks: 0.49
// Turnovers: 1.5

// http://www.basketball-reference.com/leagues/NBA_stats.html
// FG 44.8 FT 76.2 3P 7.4 PTS 99.1 TO 15.1 BLK 4.8 ST 7.2 AST 21.1 REB 42.2
// FG = 36.6 FGA = 81.8 FT = 18.5 FTA = 24.3 

init();
update();

$(document).dblclick(function(evt){
	init();
	update();
});
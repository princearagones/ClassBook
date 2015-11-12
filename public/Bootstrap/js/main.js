$(document).ready(function(){
	
	$("#order-number").width($(".order-data-number").width() - 3);
	$("#order-name").width($(".order-data-name").width() - 39);
	$("#order-amount").width($(".order-data-amount").width());

	$("#order-number").css("text-align", "center");
	$("#order-name").css("text-align", "center");
	$("#order-amount").css("text-align", "center");
});
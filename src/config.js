(function(){
	var config = {
		base: "../../mb_update2/src/",
		alias: {
			"jquery": "common.lib/jquery/jquery-1.8.3.min",
			"$" : "../common.lib/jquery/jquery-1.8.3.min",
			"handlebars": "common.lib/handlebars/handlebars.seajs.min",
			"engine": "common.lib/setup/engine", //模板引擎
			"setup": "common.lib/setup/setup", //ajax配置
			/*"wxShare": "https://res.wx.qq.com/open/js/jweixin-1.0.0.js",*/
			"swiper": "common.swiper/swiper.min",
		}
	};

	seajs.config(config);
})();
define(function(require,exports,module){
	var myDate = new Date();

    var getDate = {
        formatterDate: function(t){
            return (t<10) ? "0"+t : t;
        },
        getFullYear: function(){
            var me = this;
            var str = myDate.getFullYear();
            
            return str;
        },
        getMonth: function(dateType){
            var me = this;
            var str = myDate.getFullYear() + "-" + me.formatterDate((myDate.getMonth())+1);
            return str;
        },
        getDate: function(dateType, log){
            var me = this;
            var str = me.getMonth() + "-" + me.formatterDate(myDate.getDate());
            var str1 = me.getMonth() + "-" + me.formatterDate(myDate.getDate())+ " " + me.formatterDate(myDate.getHours())+":" + me.formatterDate(myDate.getMinutes())+ ":" + me.formatterDate(myDate.getSeconds());

            return log ? str1 : str;
        },
        toDate: function(str, log){
            var me = this;
            var myDate = new Date(str);
            var year = myDate.getFullYear();
            var month = myDate.getMonth() + 1;
            var day = myDate.getDate();
            var hours = myDate.getHours();
            var minutes = myDate.getMinutes();
            var seconds = myDate.getSeconds();

            var str = year + '-' + me.formatterDate(month) + '-' + me.formatterDate(day);
            var str1 = year + '-' + me.formatterDate(month) + '-' + me.formatterDate(day) + " " + me.formatterDate(hours) + ":" + me.formatterDate(minutes) + ":" + me.formatterDate(seconds);
            return log ? str1 : str;
        },
    };

	module.exports = getDate;

});
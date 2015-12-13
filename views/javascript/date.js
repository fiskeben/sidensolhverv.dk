var DateModule = function () {
	var months = [
	    'januar',
	    'februar',
	    'marts',
	    'april',
	    'maj',
	    'juni',
	    'juli',
	    'august',
	    'september',
	    'oktober',
	    'november',
	    'december'
    ],

		createDate = function (date) {
      var d = getDateFromString(date);
      var string = [];
      string.push(d.getDate());
      string.push('. ');
      string.push(months[d.getMonth()]);
      string.push(' ');
      string.push(d.getFullYear());
      return string.join('');
    },

    getDateFromString = function (date) {
      var date_parts = date.toString().split('-');
      var d = new Date();
      d.setYear(date_parts[0]);
      d.setMonth(date_parts[1] - 1);
      d.setDate(date_parts[2]);
      return d;
    },

    createISOdate = function (date) {
      var d = getDateFromString(date);
      var string = [];
      string.push(d.getFullYear());
      string.push('-');
      var month = d.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      string.push(month);
      string.push('-');
      string.push(d.getDate());

      return string.join('');
    };

    return {
    	'createDate': createDate,
    	'createISOdate': createISOdate
    };
}

module.exports = DateModule;

var moment = require('moment')
var linereader = require('line-reader')
var fs = require('fs')
var util = require('util')

var ori_file = process.argv[2];
var new_file = process.argv[3];
var operation = process.argv[4];
var time_mod = process.argv[5];

if(ori_file == null || new_file == null || operation == null || time_mod == null){
	console.log('argument incorrect');
}else{
	main(ori_file, new_file, operation, time_mod);
}

function main(ori_file, new_file, operation, time_mod){
	fs.writeFileSync(new_file, '');

	linereader.eachLine(ori_file, function(line, last){
		if(line.indexOf('-->') != -1){
			var splittedLine = line.split(' ');
			var time1 = moment(splittedLine[0], "HH:mm:ss,SSS");

			if(operation == 'ADD'){
				time1.add(time_mod, 'ms');
			}else{
				time1.subtract(time_mod, 'ms');
			}

			var time2 = moment(splittedLine[2], "HH:mm:ss,SSS");

			if(operation == 'ADD'){
				time2.add(time_mod, 'ms');
			}else{
				time2.subtract(time_mod, 'ms');
			}

			var newLine = util.format('%s --> %s\n', time1.format('HH:mm:ss,SSS'), time2.format('HH:mm:ss,SSS'))

			fs.appendFileSync(new_file, newLine);
			
			//return false;
		}else{
			fs.appendFileSync(new_file, line+'\n');
		}
	});
}
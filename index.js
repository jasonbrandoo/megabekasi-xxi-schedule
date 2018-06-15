const request = require('request');
const rp = require('request-promise');
const cheerio = require('cheerio');

const options = {
	uri: 'https://m.21cineplex.com/gui.schedule.php?sid=&find_by=1&cinema_id=BKSMEBE&movie_id=',
	transfrom: (body)=>{
		return cheerio.load(body);
	}
}

rp(options)
	.then((data)=>{
		const item = {};
		const movies = [];
		const $ = cheerio.load(data);
		$('.list-group-item').each((i, elem)=>{
			const movie = $(elem).children().eq(1).text();
			const date = $(elem).children().eq(7).children().eq(0).children().eq(0).children().eq(1).html();
			const price = $(elem).children().eq(7).children().eq(0).children().eq(1).text();
			const time = $(elem).children().eq(7).children().eq(0).find('.p_time').first().text();
			movies.push({
				Movie: movie,
				Date: date,
				Price: price,
				Time: time
			});
		});
		item.data = movies;
		console.log(item);
	})
	.catch((err)=>{
		console.log(err);
	})
function filter(movies) {
	
	return _.map(movies, function(movie, i) {			
		movie.reviews = _.reduce(movie.reviews, function(memo, review) {			
			return memo + review.score;
		}, 0) / movie.reviews.length;

		return movie;
	});

}
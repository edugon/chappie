exports.colors = {
	DARK_GREEN: 'DARK_GREEN',
	DARK_RED: 'DARK_RED',
	DARK_GOLD: 'DARK_GOLD'
}

exports.icons = {
	INFO: 'http://www.myiconfinder.com/uploads/iconsets/256-256-92772c80d46c3d241a175d4ade309f88.png'
}

exports.gifs = {
	REGARDS: 'https://media2.giphy.com/media/pjZLhQIEx9dBe/giphy.gif',
	WALKING: 'https://media.giphy.com/media/KWjRQ4Zttlzb2/giphy.gif'
}

exports.hosts = {
	YOUTUBE: {
		name: 'YOUTUBE',
		url: 'https://www.googleapis.com/youtube/v3/',
		regex: /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
	},
	GIPHY: {
		name: 'GIPHY',
		url: 'https://api.giphy.com/v1/gifs/'
	}
}
(function() {
	function SongPlayer(Fixtures) {
		var SongPlayer = {};
		
		/**
		* @desc album that songs are currently being played from
		* @type {Object}
		*/
		var currentAlbum = Fixtures.getAlbum();
		
		/**
		* @desc Buzz object audio file
		* @type {Object}
		*/
		var currentBuzzObject = null;
		
		/**
		* @function playSong
		* @desc Starts playing a song and sets song.playing to true
		* @param {Object} song
		*/		
		var playSong = function(song) {
			currentBuzzObject.play();
			song.playing = true;
		}
		
		/**
		* @function setSong
		* @desc Stops currently playing song and loads new audio file as currentBuzzObject
		* @param {Object} song
		*/
		var setSong = function(song) {
			if(currentBuzzObject) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			}
			
			currentBuzzObject = new buzz.sound(song.audioUrl, {
				formats: ['mp3'],
				preload: true
			});
			
			SongPlayer.currentSong = song;
		};
		
		/**
		*	@function getSongIndex
		* @desc returns the index of the song passed to it
		* @param {Object} song
		*/
		var getSongIndex = function(song) {
			return currentAlbum.songs.indexOf(song);
		};
		
		/**
		*@desc Currently playing song
		*@type {Object}
		*/
		SongPlayer.currentSong = null;
		
		/**
		* @function SongPlayer.play
		* @desc Checks to see if the currentSong is equal to the song passed in. If it isn't, starts playing the new song. If it is, it pauses the currently playing song.
		* @param {Object} song
		*/
		SongPlayer.play = function(song) {
			song = song || SongPlayer.currentSong;
			if (SongPlayer.currentSong !== song) {
				setSong(song);
				playSong(song);
			} else if (SongPlayer.currentSong == song) {
				if (currentBuzzObject.isPaused()) {
					playSong(song);
				}
			}
		};
		
		/**
		* @function SongPlayer.pause
		* @desc pauses the currently playing song
		* @param {Object} song
		*/
		SongPlayer.pause = function(song) {
			song = song || SongPlayer.currentSong;
			currentBuzzObject.pause();
			song.playing = false;
		}
		
		/**
		* @function SongPlayer.previous
		* @desc plays the song before the currently playing song
		*
		*/
		SongPlayer.previous = function() {
			var currentSongIndex = getSongIndex(SongPlayer.currentSong);
			currentSongIndex--;
			
			if (currentSongIndex < 0) {
				currentBuzzObject.stop();
				SongPlayer.currentSong.playing = null;
			} else {
				var song = currentAlbum.songs[currentSongIndex];
				setSong(song);
				playSong(song);
			}
		};
		
		return SongPlayer;
	}
	
	angular
		.module('blocJams')
		.factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
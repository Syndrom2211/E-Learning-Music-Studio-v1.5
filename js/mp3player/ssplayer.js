/*
    Jquery plugin	
	ssPlayer standalone audio player version 1.1
	Creator: ThemeSpartans
	Created: 7/5/2014
	
	browsers supported: IE8 and later,Mozilla,Safari,Chrome,Opera!	
*/
(function( $ ) {
	//create plug in name function!
	$.fn.ssPlayer=function(options){
		
		var	container=$(this);
		var listArray=[];
		var shuffleArray=[];
		var audioPlayer;
		var currentText;		
		var currentListTrack=0;
		var newListTrack=0;		
		var setShuffle=false;
		var setReplay=false;
		var isListOpen=false;
		var isPlay=false;
		var seekEnabled=false;	
		var soundLoaded=false;

		//create defaults variables option settings!		
		var settings = $.extend({
			
			xmlPath: "SongList.xml",
			autoStart: false,
			shuffleStart: false,
			replayStart: false,
			playList: "hide",
			blurLevel: 10,
			colorRGBA:"168,24,58,0.3" 
			
		}, options );
		
		//Function init start the player plugin
		function init(){
			buildPlayer();
			loadXml();
		}

		//function build player layout
		function buildPlayer(){
			var buttonItem='<div id="button"></div>';
			container.append('<div id="ssplayer"></div>');
						
			$("#ssplayer").append('<div id="detailsContent"></div>')
			.append('<div id="track_bar"></div>')
			.append('<div id="player_controls"></div>')
			.append('<div id="track_list"></div>')
			
			$("#detailsContent").append('<div id="bgBlur"></div>')			
			.append('<div id="track_cover"></div>')
			.append('<div id="track_details"></div>');
			
			$("#track_bar").append('<div id="track_duration_time"></div>')
			.append('<div id="track_seek_bar"><div id="slideBar"></div></div>')
			.append('<div id="track_total_time"></div>');
			
			$("#player_controls").append('<div id="prev_track_button"><div id="button"></div></div>')
			.append('<div id="play_track_button"><div id="button"></div></div>')
			.append('<div id="next_track_button"><div id="button"></div></div>');
			if(!jQuery.browser.mobile){
				$("#player_controls").append('<div id="sound_button"><div id="button"></div></div>')
				.append('<div id="soundBar"><div id="slideBar"></div></div>');
			}
			$("#player_controls").append('<div id="list_button"><div id="button"></div></div>')
			.append('<div id="replay_button"><div id="button"></div></div>')
			.append('<div id="shuffle_button"><div id="button"></div></div>');			
			
            $("#prev_track_button #button").append('<div id="back"></div>')
			.append('<div id="hover" class="buttonSimple"></div>')
			.append('<div id="icon"></div>');   
			$("#play_track_button #button").append('<div id="back"></div>')
			.append('<div id="hover" class="buttonSimple"></div>')
			.append('<div id="icon"></div>')
			.append(' <div id="reverseIcon"></div>');
			$("#next_track_button #button").append('<div id="back"></div>')
			.append('<div id="hover" class="buttonSimple"></div>')
			.append('<div id="icon"></div>'); 
			$("#sound_button #button").append('<div id="back"></div>')
			.append('<div id="hover" class="buttonSimple"></div>')
			.append('<div id="icon"></div>')
			.append(' <div id="reverseIcon"></div>');
			$("#shuffle_button #button").append('<div id="back"></div>')
			.append('<div id="hover" class="buttonSimple"></div>')
			.append('<div id="icon"></div>');   
			$("#replay_button #button").append('<div id="back"></div>')
			.append('<div id="hover" class="buttonSimple"></div>')
			.append('<div id="icon"></div>');
			$("#list_button #button").append('<div id="back"></div>')
			.append('<div id="hover" class="buttonSimple"></div>')
			.append('<div id="icon"></div>');  
			
			$("#prev_track_button #button #icon").append('<img src="img/mp3player/prevBtn.png"/>');
			$("#play_track_button #button #icon").append('<img src="img/mp3player/playBtn.png"/>');
			$("#play_track_button #button #reverseIcon").append('<img src="img/mp3player/pause.png"/>');
			$("#next_track_button #button #icon").append('<img src="img/mp3player/nextBtn.png"/>');
			$("#sound_button #button #icon").append('<img src="img/mp3player/speakerOn.png"/>');
			$("#sound_button #button #reverseIcon").append('<img src="img/mp3player/speakerOff.png"/>');
			$("#shuffle_button #button #icon").append('<img src="img/mp3player/shuffle.png"/>');
			$("#replay_button #button #icon").append('<img src="img/mp3player/replay.png"/>');
			$("#list_button #button #icon").append('<img src="img/mp3player/list.png"/>');
			
			$("#track_list").append('<div id="scroll_bar"><div id="scroller"></div></div>');
			$("#track_seek_bar #slideBar").slider({range: "min",animate:true});
			$("#soundBar #slideBar").slider({range: "min",value:50,animate:true});
			$("#scroll_bar #scroller").slider({orientation: "vertical",value: 100,animate:true});
			
			$("#track_seek_bar #slideBar").append('<div id="seekProgress"></div>');
			
			$("#ssplayer").append('<audio id="audio" preload="auto"></audio>');
			audioPlayer=$("#audio")[0];		
		}		
		//loading the xml data for the player list.
		function loadXml(){
			 $.get(settings.xmlPath,function(xml){				
				 $(xml).find("xmlList > trackItem").each(function(index, element) {
					listArray.push( {
						'titleTrack': $(this).find('title').text(),
						'albumTrack': $(this).find('album').text(),
						'artistTrack': $(this).find('artist').text(),
						'coverTrack': $(this).find('cover').text(),
						'soundTrackMpeg': $(this).find('trackMpeg').text(),
						'soundTrackWav': $(this).find('trackWav').text(),
						'soundTrackOgg': $(this).find('trackOgg').text()
					} );
               	});
				initializaPlayer();			
			});					
		}
		//create the details texts for the player
		function createTextPlayer(currentTrackNum){
			currentText='';
			if(listArray[currentTrackNum]['titleTrack']!=""){
				currentText+=listArray[currentTrackNum]['titleTrack'];
			}else{
				currentText+="Unknown Title Track";
			}
			if(listArray[0]['artistTrack']!=""){
				currentText+='<br><span>'+listArray[0]['artistTrack']+'</span>';
			}else{
				currentText+='<br><span>Unknown Artist</span>';
			}
			if(listArray[0]['albumTrack']!=""){
				currentText+='<span>-'+listArray[0]['albumTrack']+'</span>';	
			}else{
				currentText+='<span>-Unknown Album</span>';
			}
			$("#track_details").html(currentText);
			replaceImage(listArray[currentListTrack]['coverTrack']);
		}
		//replace new image cover album track if exist!
		function replaceImage(imagePath){
			if(imagePath==""){
				imagePath="img/mp3player/thumbDefault.jpg"	;
			}
			var img = new Image();			
			$(img).load(function(e){				
				setImage(imagePath);					
			}).error(function(e) {
                imagePath="img/mp3player/thumbDefault.jpg"	;
				setImage(imagePath);
            });
			img.src=imagePath;
		}
		//function set the image
		function setImage(newImage){
			$("#track_cover").html('<img src="'+newImage+'" class="coverStart"/>');			
				$("#track_cover img").switchClass('coverStart','coverShow');
				$("#bgBlur").css({"background-image":"url("+newImage+")","display":"none"});
				$("#bgBlur").blurjs({	
					source: '#bgBlur',			
					radius: settings.blurLevel,
					overlay: 'rgba('+settings.colorRGBA+')',
					offset: {
								x: 50,
								y: 50
							}
				});	
				$("#bgBlur").fadeIn(1000,'easeInOutQuint');
		}
		//initialize the player to be ready to start
		function initializaPlayer(){
			createTextPlayer(currentListTrack);						
			$("#track_total_time").html('00:00');
			$("#track_duration_time").html('00:00');
			createSoundElements(currentListTrack);			
			if(listArray.length>1){
				createList();
				showScrollBar();
				setListEvent();
			}
			createEvents();
			audioPlayer.volume=($("#soundBar #slideBar").slider( "value" ))/100;
			audioPlayer.load();
			disableEvents();
		}
		//create the events manage the player
		function createEvents(){
			//begin loading
			audioPlayer.addEventListener('loadstart',function (){				
				$("#track_seek_bar #slideBar").slider({"value":0});		
				$("#seekProgress").css({"width":"0%"});	
				$("#track_total_time").html('00:00');
				$("#track_duration_time").html('00:00');
				//$("#play_track_button").unbind("click");	
			},false);
			//progress loading	
			audioPlayer.addEventListener('progress',function (e){
				var loadProgress=Math.floor((this.buffered.end(0)/this.duration)*100);
				$("#seekProgress").css({"width":loadProgress+"%"});
			},false);	
			//first frame load complete		
			audioPlayer.addEventListener('loadedmetadata',function (){	
				$("#soundBar #slideBar").slider({"slide":refreshVolume,"change":refreshVolume});
				$("#track_seek_bar #slideBar").slider({"slide":seekTrack,"start":seekStart,"stop":seekStop});
			},false);	
				
			if(jQuery.browser.mobile){
				//audio full loaded then start(for ios)!		
				audioPlayer.addEventListener('canplaythrough',function (){
					timerConvert(this.duration,$("#track_total_time"));
					clearAutoPlay();
					//$("#play_track_button").bind("click",playPauseSound);
				},false);
			}else{
				//audio loaded and start when ready first frames!
				audioPlayer.addEventListener('canplay',function (){
					timerConvert(this.duration,$("#track_total_time"));
					clearAutoPlay();
					//$("#play_track_button").bind("click",playPauseSound);
				},false);
			}
			audioPlayer.addEventListener('error',function (e){	
					currentText+='<br><span>-error loading sound-</span>';
					$("#track_details").html(currentText);
			},true);
			audioPlayer.addEventListener('timeupdate',updateRunTime,false);
			audioPlayer.addEventListener('play',playToPause,false);
			audioPlayer.addEventListener('pause',pauseToPlay,false);
			audioPlayer.addEventListener('ended',onEndPlayNext,false);
		
			$("#track_seek_bar #slideBar").mousedown(seekTrack);
			$("#play_track_button").bind("click",playPauseSound);
			$("#sound_button").click(function(e) {
                muteUnmuted();
            });
			$("#track_list ul li").mouseover(function(e) {
				 $(this).stop(false,true).addClass("trackListSelected",1000,"easeInOutQuint");
            })
			.mouseout(function(e) {
				if($(this).index()!=currentListTrack){
					$(this).stop(false,true).removeClass("trackListSelected",1000,"easeInOutQuint");
				}
            });	
			$("#prev_track_button").click(function(e) {
               playPrevTrack();
            });
			$("#next_track_button").click(function(e) {
               playNextTrack(); 
            });
			$("#shuffle_button").click(function(e) {
               onShuffleClick();
            });
			$("#replay_button").click(function(e) {
               onReplayClick();
            });
			$("#list_button").click(function(e) {
				if(isListOpen){
					isListOpen=false;
					removeHighlightButton("#list_button");
				}else{
					isListOpen=true;
					addHighlightButton("#list_button");
				}
				$("#track_list").stop(false,true).slideToggle(500,"easeInOutQuint");
            });
			animateButtonEvent("#prev_track_button");
			animateButtonEvent("#play_track_button");
			animateButtonEvent("#next_track_button");
			animateButtonEvent("#prev_track_button");
			animateButtonEvent("#sound_button");
			animateButtonEvent("#shuffle_button");
			animateButtonEvent("#replay_button");
			animateButtonEvent("#list_button");
			
			if(settings.shuffleStart){
				setShuffle=true;
				addHighlightButton("#shuffle_button");
				shuffleNumber();		
			}
			if(settings.replayStart){
				setReplay=true;
				addHighlightButton("#replay_button");
			}	
			$(window).resize(function(e) {
                showScrollBar();
            });
		}
		//function set when autoplay is off!
		function clearAutoPlay(){
			if(settings.autoStart){
				audioPlayer.play();	
			}else{
				settings.autoStart=true;
			}
		}
		//disable some events
		function disableEvents(){
			if(listArray.length<2){
				$("#prev_track_button,#next_track_button,#shuffle_button").unbind();
				$("#prev_track_button,#next_track_button").css({"opacity":"0.5","cursor":"default"});
			}
		}
		//create the sound elements supported from all browsers(will be loaded from xml)
		function createSoundElements(numTrack){
		 $("#audio").append('<source id="trackMpeg_src" src="'+listArray[numTrack]['soundTrackMpeg']+'" type="audio/mpeg">')	  		.append('<source id="trackWav_src" src="'+listArray[numTrack]['soundTrackWav']+'" type="audio/wav">')
		.append('<source id="trackOgg_src" src="'+listArray[numTrack]['soundTrackOgg']+'" type="audio/ogg">');
		}
		//replace sounds when from list selected another track
		function replaceSounds(numTrack){
			removeHighlightList("#track_list ul li:nth-child("+(newListTrack+1)+")");		
			$("#trackMpeg_src")[0].src=listArray[numTrack]['soundTrackMpeg'];
			$("#trackWav_src")[0].src=listArray[numTrack]['soundTrackWav'];
			$("#trackOgg_src")[0].src=listArray[numTrack]['soundTrackOgg'];			
			newListTrack=currentListTrack=numTrack;
			addHighlightList("#track_list ul li:nth-child("+(newListTrack+1)+")");
		}
		//create the list tracks show in the player
		function createList(){
			$("#track_list").append('<ul></ul>');
			for(var i=0; i<listArray.length; i++){
				$("#track_list ul").append('<li class="trackListNormal">'+listArray[i]['titleTrack']+'</li>');
			}
			$("#track_list ul li").each(function(index, element) {
                $(this).mousedown(function(e) {
                   replaceSounds(index);
				   createTextPlayer(index);				   
				   audioPlayer.load();
				   clearAutoPlay();
                });
            });
			createShuffleTracks();
			addHighlightList("#track_list ul li:nth-child("+(currentListTrack+1)+")");

		}
		//set The list show or hide events or collapse when mouse over.
		function setListEvent(){
			switch(settings.playList){
				case "show":
				$("#track_list").css({"display":"block"});
				isListOpen=true;
				addHighlightButton("#list_button");
				break;
				
				case "hide":
				$("#track_list").css({"display":"none"});
				isListOpen=false;
				removeHighlightButton("#list_button");
				break;				
			}
		}
		//play next track action when requested
		function playNextTrack(){
			if(!setShuffle){
				if(currentListTrack<(listArray.length-1)){
					currentListTrack++;
				}else{
					currentListTrack=0;
				}
			}else{
				shuffleNumber();
			}
			replaceSounds(currentListTrack);
			createTextPlayer(currentListTrack);			
			audioPlayer.load();
			clearAutoPlay();
			
		}	
		//Play next track when ends previous track playing	
		function onEndPlayNext(){
			if(!setReplay&&currentListTrack<(listArray.length-1)){
				if(!setShuffle){					
					currentListTrack++;					
				}else{
					shuffleNumber();
				}
				  replaceSounds(currentListTrack);
				  createTextPlayer(currentListTrack);				  
				  audioPlayer.load();
				  
			}
			if(setReplay){
				if(!setShuffle){
					if(currentListTrack<(listArray.length-1)){
						currentListTrack++;
					}else{					
						currentListTrack=0;					
					}
				}else{
					shuffleNumber();
				}
				  replaceSounds(currentListTrack);
				  createTextPlayer(currentListTrack);				  
				  audioPlayer.load();
				  
			}
		}
		//play the previous track action when requested
		function playPrevTrack(){
			if(!setShuffle){
				if(currentListTrack>0){
					currentListTrack--;
				}else{
					currentListTrack=(listArray.length-1);
				}
			}else{
				shuffleNumber();
			}
			replaceSounds(currentListTrack);
			createTextPlayer(currentListTrack);			
			audioPlayer.load();
			clearAutoPlay();
		}
		//function create the shuffle action
		function createShuffleTracks(){
			for(var i=0; i<listArray.length; i++){
				shuffleArray.push(i);
			}
			removeArrayItem(currentListTrack);
		}
		//Function select the shuffle number will play
		function shuffleNumber(){
			if(shuffleArray.length === 0){
				createShuffleTracks();
			}
			var newNumber=shuffleArray[Math.floor(Math.random()*shuffleArray.length)];
			currentListTrack=newNumber;
			removeArrayItem(currentListTrack);
		}
		//remove shuffle numbers already play on the list
		function removeArrayItem(removeItem){
			shuffleArray = jQuery.grep(shuffleArray, function(value) {
			  return value !== removeItem;
			});
		}
		//function when shuffle button clicked action 
		function onShuffleClick(){
			if(!setShuffle){
				setShuffle=true;
				addHighlightButton("#shuffle_button");
				shuffleNumber();		
			}else{
				setShuffle=false;
				removeHighlightButton("#shuffle_button");
			}
		}
		//function when replay button clicked action
		function onReplayClick(){
			if(!setReplay){
				setReplay=true;
				addHighlightButton("#replay_button");
			}else{
				setReplay=false;
				removeHighlightButton("#replay_button");
			}
		}
		//function show scroll bar when needed 
		function showScrollBar(){			
			if(jQuery.browser.mobile){
				$("#track_list").css({'overflow-y':'scroll','-webkit-overflow-scrolling': 'touch'});
			}else{
				if(listArray.length>5){
					var currentListWidth=$("#ssplayer #track_list ").width();
					$("#ssplayer #track_list #scroll_bar").css({"display":"block"});
					$("#ssplayer #track_list ul").css({"width":(currentListWidth-11)+"px"});
					$("#scroll_bar #scroller").slider({"slide":scrollList,"change":scrollList});
				}
			}
		}
		//function scrolling the track list when scroll bar clicked or slided
		function scrollList(event, ui){
		   var _list=$("#ssplayer #track_list");
		   var _listContent=$("#ssplayer #track_list ul");
		   if ( _listContent.height()> _list.height() ) {
			_listContent.css("margin-top", Math.round((100-ui.value)/100*(_list.height()-_listContent.height())) + "px");
		  } else {	
			_listContent.css( "margin-top", 0 );	
		  }	
		}
		//function convert track timers
		function timerConvert(setTimer,setElement){
			var mins=0;
			var secs=0;
			mins=Math.floor(setTimer/60);
			mins = mins >= 10 ? mins : '0' + mins;
			secs=Math.floor(setTimer%60);
			secs = secs >= 10 ? secs : '0' + secs;
			setElement.html(mins+':'+secs);
		}
		//function animate the buttons player
		function animateButtonEvent(target){
			if(jQuery.browser.mobile){
				$(target).on( "vmousedown", function(e) {
					 $(target+" #button #hover").addClass("buttonSelect");
				}).on( "vmouseup", function(e) {
					if(!$(target+" #button #hover").data( "checked" )){
						$(target+" #button #hover").removeClass("buttonSelect");
					}
				});	
			}else{
				$(target).mouseover(function(e) {
					 $(target+" #button #hover").addClass("buttonSelect");
				})
				.mouseout(function(e) {
					if(!$(target+" #button #hover").data( "checked" )){
						$(target+" #button #hover").removeClass("buttonSelect");
					}
				});	
			}
		}
		//function remove the highlight ftom the list
		function removeHighlightList(item){
			$(item).removeClass("trackListSelected",1000,"easeInOutQuint");
		}
		//function add the highlight ftom the list
		function addHighlightList(item){
			$(item).addClass("trackListSelected",1000,"easeInOutQuint");
		}
		//function add the highlight ftom the buttons
		function addHighlightButton(item){
			$(item+" #button #hover").data("checked","checked")
			.addClass("buttonSelect");
		}
		//function remove the highlight ftom the buttons
		function removeHighlightButton(item){
			$(item+" #button #hover").removeData("checked")
			.removeClass("buttonSelect");
		}
		//function update run time for the track play and seek bar show
		function updateRunTime(){
			timerConvert(this.currentTime,$("#track_duration_time"));										
			if(!seekEnabled && isPlay){			
				var currentSeek=Math.floor((this.currentTime/this.duration)*100);			
				$("#track_seek_bar #slideBar").slider({"value":currentSeek});
			}
		}
		//function manage the play to pause action when track stop playing
		function playToPause(){
			isPlay=true;
			$("#play_track_button #button #reverseIcon").css({"display":"block"});
			$("#play_track_button #button #icon").css({"display":"none"});
		}
		//function play the pause to play action when track start playing
		function pauseToPlay(){
			isPlay=false;
			$("#play_track_button #button #reverseIcon").css({"display":"none"});
			$("#play_track_button #button #icon").css({"display":"block"});
		}
		//function play or pause track when button clicked
		function playPauseSound(){
			if(audioPlayer.paused){
				audioPlayer.play();
				clearAutoPlay();
			}else if(audioPlayer.played){
				audioPlayer.pause();
			}
		}
		//function mute or unmute the sound when button clicked
		function muteUnmuted(){			
			if(audioPlayer.muted){
				audioPlayer.muted=false;
				$("#sound_button #button #reverseIcon").css({"display":"none"});
				$("#sound_button #button #icon").css({"display":"block"});
				$("#soundBar #slideBar").slider("enable")
				.animate({"opacity":1},500);
			}else{
				audioPlayer.muted=true;
				$("#sound_button #button #reverseIcon").css({"display":"block"});
				$("#sound_button #button #icon").css({"display":"none"});	
				$("#soundBar #slideBar").slider("disable")	
				.animate({"opacity":0.5},500);		
			}
		}
		//function refresh volume after slider change
		function refreshVolume(){
			audioPlayer.volume=($("#soundBar #slideBar").slider( "value" ))/100;
		}
		//function when start seek track bar
		function seekStart(){
			seekEnabled=true;	
		}
		//function when stop seek track bar
		function seekStop(){
			seekEnabled=false;					
		}
		//function when bar seeked with mouse
		function seekTrack(){
			if(seekEnabled){
				audioPlayer.currentTime=($("#track_seek_bar #slideBar").slider( "value" )/100)*audioPlayer.duration;
			}
		}
		init();		
	}
})( jQuery );
//end of jquery plugin!
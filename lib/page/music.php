<?php
if(isset($_SESSION["user"])&&($_SESSION["passwd"])){
?>
<div class="boxwidget2">
	<div class="boxwidget3">
	<h1>Music Player</h1>
		<center><div id="musicplayer"></div></center>
	</div>
</div>
<?php
}else{
	header('location: index.php?page=login');
}
?>
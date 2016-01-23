<?php
ob_start();
require_once("lib/function.php");
session();
koneksi();
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>E-Learning Music Studio</title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="css/style.css" />
	<link rel="stylesheet" href="css/skin.css" />
	<link rel="shortcut icon" href="img/music_icon.png" />
	<script type="text/javascript" src="js/button.js"></script>
	<script type="text/javascript" src="js/button2.js"></script>
	<script type="text/javascript" src="js/hcb.js"></script>
	<!-- MP3 Player -->
	<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="js/mp3player/blur.min.js"></script>
	<script type="text/javascript" src="js/mp3player/mobile_init.js"></script>
	<script type="text/javascript" src="js/mp3player/jquery.mobile-1.4.2.min.js"></script>
	<script type="text/javascript" src="js/mp3player/jquery-ui-1.10.4.custom.min.js"></script>
	<script type="text/javascript" src="js/mp3player/detectmobilebrowser.js"></script>
	<script type="text/javascript" src="js/mp3player/ssplayer.js"></script>
	<link href="css/mp3player/style.css" rel="stylesheet" type="text/css">
	<link href="css/mp3player/settings.css" rel="stylesheet" type="text/css">
	<script>
	/*Set the player here when document is ready!*/
	$(document).ready(function(e) {
		$("#musicplayer").ssPlayer({
			playList: "show"
		});
	});
	</script>
</head>
<body>
	<div id="container">
		<!-- HEADER -->
		<div id="header">
			<!-- HEADER 2 -->
			<div id="header2">
				<div class="rapih"></div>
				<!-- LINK KONTAK -->
				<div class="link-kontak">
					<a href="http://fb.me/Ravnui.Embassy.us" target="_blank"><img src="img/kontak/facebook.png" width="24" height="24"></a>
					<a href="http://twitter.com/Syndrom2211" target="_blank"><img src="img/kontak/twitter.png" width="24" height="24"></a>
					<a href="http://soundcloud.com/firdammitulz" target="_blank"><img src="img/kontak/soundcloud.png" width="24" height="24"></a>
					<a href="http://youtube.com/user/bangfirdam" target="_blank"><img src="img/kontak/youtube.png" width="24" height="24"></a>
				</div>
				
				<!-- TOTAL VISITOR -->
				<div class="total_visitor">
				<?php 
					$ip = $_SERVER['REMOTE_ADDR']; // Untuk mengetahui no IP pengunjung
					$tgl = date("Y-m-d");
					visitor($ip, $tgl);
					$q = mysql_query("SELECT * FROM tb_pengunjung");
					$pengunjung = mysql_num_rows($q); // untuk menghitung total pengunjung
					echo "<b>Visitor : ".$pengunjung."</b>";
				?>
				</div>
				<div class="rapih"></div>
			</div>
			
			<!-- JUDUL WEBSITE -->
			<div id="judul">
				<h1><a href="index.html">E-Learning Music Studio</a></h1>
				<h2>Berbagai macam pembelajaran tentang musik digital</h2>
			</div>	

		<!-- MENU NAVIGASI-->
		<div id="menu">
			<table cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td valign="top">
				<div id="menu2">
					<input type="checkbox">
					<label>&equiv;</label>
					<ul>
						<li><a href="index.php">Beranda</a></li>
						<li><a href="index.php?page=artikel">Artikel</a></li>
						<?php
						if(isset($_SESSION["user"])&&($_SESSION["passwd"])){
							echo '<li><a href="index.php?page=music" target="_blank">Music Player</a></li>';
						}else{
							echo '<li><a href="index.php?page=music">Music Player</a></li>';
						}
						?>
						<li><a href="index.php?page=user">List User</a></li>
						<?php
						if(isset($_SESSION["user"])&&($_SESSION["passwd"])){
							echo '<li><a href="index.php?page=logout">Logout</a></li>';
						}else{
							echo '<li><a href="index.php?page=login">Login / Sign Up</a></li>';
						}
						?>
					</ul>
				</div>
				</td>
			</tr>
			</table>
		</div>
		</div>

		<div style="background:#000;height:10px;opacity:0.7;"></div>
		<div class="rapih"></div>
		
		<div class="main">
			<!-- SIDEBAR KIRI -->
			<?php
			if(isset($_SESSION["user"])&&($_SESSION["passwd"])){
			?>
			<div id="sidebarkiri">
				<div class="headerwidget">Login Sebagai : <?php echo $_SESSION["user"]; ?></div>
				<div class="boxwidget">
					<?php user(); ?>
				</div>
				
				<div class="headerwidget">Quotes of the day</div>
				<div class="boxwidget">
					<?php quotes(); ?>
				</div>
			</div>
			<?php }else{ ?>
			<div id="sidebarkiri">			
				<div class="headerwidget">Quotes of the day</div>
				<div class="boxwidget">
					<?php quotes(); ?>
				</div>
				
				<div class="headerwidget">Chat Pengunjung</div>
				<div class="boxwidget">
					<div id="cboxdiv" style="position: relative; margin: 0 auto; width: 200px; font-size: 0; line-height: 0;">
						<div style="position: relative; height: 170px; overflow: auto; overflow-y: auto; -webkit-overflow-scrolling: touch; border: 0px solid;"><iframe src="http://www5.cbox.ws/box/?boxid=884703&boxtag=270mtk&sec=main" marginheight="0" marginwidth="0" frameborder="0" width="93%" height="100%" scrolling="auto" allowtransparency="yes" name="cboxmain5-884703" id="cboxmain5-884703"></iframe></div>
						<div style="position: relative; height: 108px; overflow: hidden; border: 0px solid; border-top: 0px;"><iframe src="http://www5.cbox.ws/box/?boxid=884703&boxtag=270mtk&sec=form" marginheight="0" marginwidth="0" frameborder="0" width="93%" height="100%" scrolling="no" allowtransparency="yes" name="cboxform5-884703" id="cboxform5-884703"></iframe></div>
					</div> 
				</div>
			</div>
			<?php } ?>
			
			<!-- ISI KONTENT -->
			<div id="isi">
				<?php page(); ?>
			</div>
			
			<!-- SIDEBAR KANAN -->
			<div id="sidebarkanan">			
			<div class="headerwidget">Our Tweets</div>
			
				<div class="boxwidget" align="center">
					<a class="twitter-timeline"  href="https://twitter.com/Syndrom2211" data-widget-id="265030654549442560">Tweets by @Syndrom2211</a>
					<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
				</div>
			</div>
			
			<div class="rapih"></div>
			
			<!-- FOOTER -->
			<div id="footer">
					Universitas Komputer Indonesia<br> Copyright &copy; 2015 Firdamdam Sasmita<br/>E-Learning Music Studio. Version : 1.5
			</div>
		</div>
	</div>
</body>
</html>
<?php
ob_end_flush();
?>
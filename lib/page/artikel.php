<?php
$id_artikel = '';
if(isset($_GET["id_artikel"])){
    $id_artikel = intval($_GET["id_artikel"]);
}
$kueri2 = "SELECT * FROM tb_artikel WHERE id_artikel = '$id_artikel'";
$artikel2 = mysql_query($kueri2);

// Check jika halaman tidak ada
if(isset($_GET["page"]) AND isset($_GET["id_artikel"]) ){
	if(mysql_num_rows($artikel2)==0){
		header('location: index.php');
	}else if(mysql_num_rows($artikel2)==1){
		$gak = mysql_fetch_array($artikel2);
?>
<div class="boxwidget2">
	<div class="boxwidget3">
		<h1><?php echo $gak["judul"]; ?></h1>
			<p>
				<center><img width="300px" src="<?php echo $gak["image"]; ?>" title="<?php echo $gak["judul"]; ?>" /></center>
				<br/>
				<?php echo $gak["isi"]; ?>
			</p>
			<div id="sharegal">
				<div class="tanggal">
					<?php echo "Diposting tanggal : ".$gak["tgl"]; ?>
				</div>
				<hr/>
				<div class="tombolshare">
					Share Artikel :
					<span class='st_plusone_hcount' displayText='Google +1'/>
					<span class='st_twitter_hcount' displayText='Tweet'/>
					<span class='st_facebook_hcount' displayText='Facebook'/>
				</div>
			</div>
			<?php
			if(isset($_SESSION["user"])&&($_SESSION["passwd"])){
				echo '<div id="HCB_comment_box"></div>';
				echo '<center><a href="index.php?page=artikel"><button class="komentar"><< Kembali</button></a></center>';
			}else{
				echo '<center><a href="index.php?page=login"><button class="komentar">Berikan Komentar</button></a></center>';
				echo '<center><a href="index.php?page=artikel"><button class="komentar"><< Kembali</button></a></center>';
			}
			?>
		</div>				
			</div>
<?php 
	}
}else{
?>
<div class="boxwidget2">
	<div class="boxwidget3">
	<h1>Artikel</h1>
			<ul>
			<?php
			// Paging Number
			$per_page = 10;
			$page_query = mysql_query("SELECT COUNT(*) FROM tb_artikel");
			$pages = ceil(mysql_result($page_query, 0) / $per_page);
			
			$page = (isset($_GET["no_page"])) ? (int)$_GET["no_page"] : 1;
			$start = ($page - 1) * $per_page;
			$artikel = mysql_query("SELECT * FROM tb_artikel LIMIT $start, $per_page");
			
			if(mysql_num_rows($artikel)== 0){
			   header('location: index.php');
			}else{
			   while($artikel1 = mysql_fetch_array($artikel)) {
					echo "<li class='sili'>
							<a href='index.php?page=artikel&id_artikel=".$artikel1['id_artikel']."'>".$artikel1['judul']."</a>
						  </li>";
			   }
			}
			?>
			</ul>
			<?php
			echo "<div class='no_halaman'>Halaman : ";
			   if($pages >= 1 && $page <= $pages){
					for($x=1; $x<=$pages; $x++){
						echo ($x == $page) ? '<b><a href="index.php?page=artikel&no_page='.$x.'">'.$x.'</a></b> ' : '<a href="index.php?page=artikel&no_page='.$x.'">'.$x.'</a> ';
					}
				}
			echo "</div>";
			?>
	</div>
</div>
<?php } ?>
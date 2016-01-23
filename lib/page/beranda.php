<?php
$query = "SELECT * FROM tb_welcome";
$query2 = mysql_query($query);
$query3 = mysql_fetch_array($query2);
if(isset($_SESSION["user"])&&($_SESSION["passwd"])){
?>
<div class="boxwidget2">
	<div class="boxwidget3">
	<h1>Welcome <?php echo $_SESSION["user"]; ?> !</h1>
		<p>
			<?php echo "Welcome ".$_SESSION["user"]."! ".$query3['user']; ?>
		</p>
	</div>
</div>
<?php }else{ ?>
<div class="boxwidget2">
	<div class="boxwidget3">
	<h1>Welcome Guest !</h1>
		<p>
			<?php echo $query3['guest']; ?>
		</p>
	</div>
</div>
<?php } ?>
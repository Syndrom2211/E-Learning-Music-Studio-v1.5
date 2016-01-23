<?php

/*------------------------------|~

START FUNCTION !
Coded by : Firdam

--------------------------------|~*/

function session(){
	session_start();
}

function koneksi(){
	$server = "localhost";
	$username = "root";
	$password = "";
	$database = "new_1_5";

	@mysql_connect($server, $username, $password);
	@mysql_select_db($database);
}

function user(){
	$query3 = "SELECT * FROM tb_user WHERE username='$_SESSION[user]'";
	$query4 = mysql_query($query3);
	$data2 = mysql_fetch_array($query4);
				
	// Tampil Gambar DAW
	echo "<div align='center'>";
		if($data2["daw"] == "Ableton Live"){
			echo "<img src='img/daw/ableton.png' width='100px' />";
		}else if($data2["daw"] == "Cubase"){
			echo "<img src='img/daw/Cubase.png' width='100px' />";
		}else if($data2["daw"] == "FL Studio"){
			echo "<img src='img/daw/flstudio.png' width='100px' />";
		}else if($data2["daw"] == "Pro Tools"){
			echo "<img src='img/daw/pro-tools.png' width='100px' />";
		}else if($data2["daw"] == "Reaper"){
			echo "<img src='img/daw/reaper.png' width='100px' />";
		}else if($data2["daw"] == "Sonar"){
			echo "<img src='img/daw/sonar.png' width='100px' />";
		}else{
			echo "<img src='img/no-daw.png' width='100px' />";
		}
	echo "</div>";
	echo "<p><font size='2px'><b>Pengguna DAW : ".$data2["daw"]."<br/>Email : ".$data2["email"]."</b></font></p>";
}

function quotes(){
	$query1 = "SELECT * FROM tb_quotes";
	$query2 = mysql_query($query1);
	$data = mysql_fetch_array($query2);
	?>
	<script language="JavaScript">
		//store the quotations in arrays
		tips = new Array(4);
		tips[0] = "<center><p><?php echo $data['quotes1']; ?></p></center>";
		tips[1] = "<center><p><?php echo $data['quotes2']; ?></p></center>";
		tips[2] = "<center><p><?php echo $data['quotes3']; ?></p></center>";
		tips[3] = "<center><p><?php echo $data['quotes4']; ?></p></center>";
		//calculate a random index
		index = Math.floor(Math.random() * tips.length);
		//display the quotation
		document.write("\n");
		document.write(tips[index]);
		//done
	</script>
	<?php
}

function page(){
	$dir_page = "lib/page";
			
	if(!empty($_GET["page"])){
	$halaman = scandir($dir_page, 0);
	unset($halaman[0], $halaman[1]);
			
	$page = $_GET['page'];
				
	if(in_array($page.".php", $halaman)){
		include($dir_page."/".$page.".php");
	}else{
		header('location: index.php');
	}
	}else{
	include($dir_page."/beranda.php");
	}
}

function login(){
if(isset($_POST['login'])){
		$username = $_POST['username'];
		$password = $_POST['password'];
		$sql = mysql_query("SELECT * FROM tb_user WHERE username='$username' && password='".md5($password)."'");
		$num = mysql_num_rows($sql);
		
		if($num==1){
			// login benar
			$_SESSION['user'] = $username;
			$_SESSION['passwd'] = $password;
			header('location: index.php');
		}else{
			// login salah
			echo "<div class='notifsalah'><img src='img/error.png' width='20px;' />Login Gagal !</div>";
		}		
	}
}

function daftar(){
	if(isset($_POST['signup'])){	
		// Cek Username di database
		$cek_username  = mysql_query("SELECT username FROM tb_user WHERE username='$_POST[username]'");
		$cek_username1 = mysql_num_rows($cek_username);
		
		if(empty($_POST["username"]) || empty($_POST["password"]) || empty($_POST["email"]) || empty($_POST["daw"])){
			echo "<div class='notifsalah'><img src='img/error.png' width='20px;' />Data kurang lengkap !</div>";
		}else if($_POST["kode"] != $_SESSION["kode_cap"] || $_POST["kode"] == ""){
			echo "<div class='notifsalah'><img src='img/error.png' width='20px;' />Kode captcha salah! !</div>";
		}else if($cek_username1 > 0){
			echo "<div class='notifsalah'><img src='img/error.png' width='20px;' />Username sudah ada !</div>";
		}else{
			$sql = "INSERT INTO tb_user(id,username,password,email,daw) values 
					('','".$_POST["username"]."','".md5($_POST["password"])."','".$_POST["email"]."','".$_POST["daw"]."')";
			$query = mysql_query($sql);
			echo "<div class='notifbenar'><img src='img/benar.png' width='20px;' />Daftar Berhasil ! Silahkan Login di atas !</div>";
		}
	}
}

function visitor($ip, $tgl){
	$query = mysql_query("SELECT * FROM tb_pengunjung WHERE ip='$ip' AND tgl='$tgl'");
	$run_query = mysql_fetch_array($query);
	if($ip != $run_query['ip'] && $tgl != $run_query['tgl']){
		mysql_query("INSERT INTO tb_pengunjung (ip, tgl) values ('$ip','$tgl')");
	}
}
?>
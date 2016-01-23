<div class="boxwidget2">
	<div class="boxwidget3">
	<h1>List User</h1>
		<?php
		// Paging Number
		$per_page = 5;
		$page_query = mysql_query("SELECT COUNT(*) FROM tb_user");
		$pages = ceil(mysql_result($page_query, 0) / $per_page);
			
		$page = (isset($_GET["no_page"])) ? (int)$_GET["no_page"] : 1;
		$start = ($page - 1) * $per_page;
		$user = mysql_query("SELECT * FROM tb_user");
		$user_limit = mysql_query("SELECT * FROM tb_user LIMIT $start, $per_page");
		$total = mysql_num_rows($user);
		
		// Cek jika no halaman tidak ada
		if(mysql_num_rows($user_limit) == 0){
			header('location: index.php');
		}else{
			echo "<div class='tablearea2'>";
			echo "<div id='listuser' align='center'>";
				echo "<table class='usertable' cellpadding='0' cellspacing='0' border='0'>";
					echo "<tr>
								<th class='headerkolom'>Username</th>
								<th class='headerkolom'>Email</th>
								<th class='headerkolom'>DAW</th>
						  </tr>";	
				while($row = mysql_fetch_array($user_limit)){
					echo "<tr>
								<td class='kolom'>".$row['username']."</td>
								<td class='kolom'>".$row['email']."</td>
								<td class='kolom'>".$row['daw']."</td>
						  </tr>";
				}
					echo "<tr>
								<td class='kolom' colspan='3'>Total User : ".$total."</td>
						  </tr>";
				echo "</table>";
			echo "</div>";
			echo "</div>";
			echo "<div class='no_halaman'>Halaman : ";
				if($pages >= 1 && $page <= $pages){
					for($x=1; $x<=$pages; $x++){
						echo ($x == $page) ? '<b><a href="index.php?page=user&no_page='.$x.'">'.$x.'</a></b> ' : '<a href="index.php?page=user&no_page='.$x.'">'.$x.'</a> ';
					}
				}
			echo "</div>";
		}
		?>
	</div>
</div>
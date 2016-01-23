<?php
if(isset($_SESSION["user"])&&($_SESSION["passwd"])){
	header('location: index.php');
}else{
?>
			<div class="boxwidget2">
				<div class="boxwidget3">
				<h1>Login / Sign Up</h1>
						<h2>Login :</h2>
							<form action="index.php?page=login" name="form_login" method="POST">
								<?php login(); ?>
								<div class="tablearea">
									<table cellpadding="5" cellspacing="0" border="0">
									<tr>
										<td>Username</td>
										<td>:</td>
										<td><input class="inputan" type="text" name="username" placeholder="Masukan Username" /></td>
									</tr>
									<tr>
										<td>Password</td>
										<td>:</td>
										<td><input class="inputan" type="password" name="password" placeholder="Masukan Password" /></td>
									</tr>
									</table>
								</div>
									<table cellpadding="5" cellspacing="0" border="0">
									<tr>
										<td><input class="tombollogup" type="submit" name="login" value="Login" /></td>
									</tr>
									</table>
							</form>
						<h2>Sign Up :</h2>
							<form action="index.php?page=login" name="form_daftar" method="POST">
							<?php daftar(); ?>
							<div class="tablearea">
								<table cellpadding="5" cellspacing="0" border="0">
								<tr>
									<td>Username</td>
									<td>:</td>
									<td><input class="inputan" type="text" name="username" placeholder="Masukan Username" /></td>
								</tr>
								<tr>
									<td>Password</td>
									<td>:</td>
									<td><input class="inputan" type="password" name="password" placeholder="Masukan Password" /></td>
								</tr>
								<tr>
									<td>Email</td>
									<td>:</td>
									<td><input class="inputan" type="email" name="email" placeholder="Masukan Email" /></td>
								</tr>
								<tr>
									<td>Software DAW yang disukai ?</td>
									<td>:</td>
									<td>
										<select class="inputan" name="daw">
											<option value="Ableton Live">Ableton Live</option>
											<option value="Cubase">Cubase</option>
											<option value="FL Studio">Fruity Loops</option>
											<option value="Pro Tools">Pro Tools</option>
											<option value="Reaper">Reaper</option>
											<option value="Sonar">Sonar</option>
											<option value="Tidak Ada">Tidak ada</option>
										</select>
									</td>
								</tr>
								<tr>
									<td></td>
									<td></td>
									<td><img src="lib/captcha.php" /><input class="inputan" type="text" placeholder="Masukan Kode Captcha" name="kode" /></td>
								</tr>
								</table>
							</div>
								<table cellpadding="5" cellspacing="0" border="0">
								<tr>
									<td><input class="tombollogup" type="submit" name="signup" value="Sign Up" /></td>
								</tr>
								</table>
							</form>
				</div>
			</div>
<?php } ?>
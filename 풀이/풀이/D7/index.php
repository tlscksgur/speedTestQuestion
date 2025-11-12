<?php

$interval = null;

if(isset($_GET['date1']) && isset($_GET['date2'])) {
    $start = new DateTime($_GET['date1']);
    $end = new DateTime($_GET['date2']);
    $interval = $start->diff($end);
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Number of Days</title>
</head>

<body>
	<h4>Calculate number of days</h4>

	<form>
		<label for="date1">Date 1:
			<input type="date" name="date1" id="date1">
		</label>

		<label for="date2">Date 2:
			<input type="date" name="date2" id="date2">
		</label>

		<input type="submit" />
	</form>

	<p>Output: <?= !$interval ? 'insert output here' : $interval->format('%a 일') ?></p>
</body>

</html>
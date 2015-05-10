<?php
/**
 * Created by PhpStorm.
 * User: emilypatonay
 * Date: 4/4/15
 * Time: 8:08 PM
 */

error_reporting(E_ALL & ~E_NOTICE);
ini_set("display_errors", 1);

header('Content-Type: application/json');  // Needed so that the receiving file knows it JSON
// Include dependencies
require_once __DIR__ . '/Dbfind.php';
require_once __DIR__ . '/TrackerData.php';
$trkdata = new TrackerData();

// This retrieves the pending cases as a JSON.
echo $trkdata->pendingCases();



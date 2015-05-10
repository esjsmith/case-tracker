<?php
/**
 * Created by PhpStorm.
 * User: emilypatonay
 * Date: 4/12/15
 * Time: 8:34 PM
 */

class TrackerData {

    private function dbConnect() {
    // connect to DB and make available to all local functions in class
    /* Connect to DB*/

        $dbfind = new Dbfind();
        $pdo = $dbfind->mkPdo();
        return $pdo;
    }

    public function pendingCases() {
        //Retrieve all pending cases and pass this out as a JSON.
        $pdo = $this->dbConnect();
        $sql1 = 'SELECT * from `active_cases` WHERE `is_active` = 1';
        $s = $pdo->query($sql1);
        $results = $s->fetchAll();
        foreach($results as $row){
            // First get an array of pending ihc for this case id_pk
            $jsonItem[] = [
                'idPk'      =>  $row['id_pk'],
                'accDate'   =>  $row['acc_date'],
                'wheelNum'  =>  $row['wheel_num'],
                'accNum'    =>  $row['acc_num'],
                'ihc'       =>  $this->dataType('ihc', $row['id_pk']),
                'histochem' =>  $this->dataType('histochem', $row['id_pk']),
                'ancillary' =>  $this->dataType('ancillary', $row['id_pk'])

            ];
        }
        return json_encode($jsonItem);
    }

    private function dataType($dataType, $caseKey){
        // Making a case/switch block to handle whether we are doing ihc, histochem, or ancillary
        $dataTypeStr = '';
        switch($dataType){
            case 'ihc':
                $dataTypeStr = 'ihc_lut';
                break;
            case 'histochem':
                $dataTypeStr = 'histochem_lut';
                break;
            case 'ancillary':
                $dataTypeStr = 'ancillary_lut';
                break;
            default:
                $outStr = 'no valid type';
                return $outStr;
        }
        
        $sql2 = "SELECT * FROM $dataTypeStr WHERE case_fk = :casekey";
        $pdo = $this->dbConnect();

        try {
            $s = $pdo->prepare($sql2);
            $s->bindParam(':casekey', $caseKey);
            $s->execute();
        } catch (PDOException $e) {
            echo "Some sort of error has occurred. MALFUNCTION 57. <br>";
            echo $e . "<br>";
        }
        $results = $s->fetchAll();
        foreach ($results as $row) {
            $jsonObj[] = [
                'orderDate'     =>      $row['order_date'],
                'interpDate'    =>      $row['interp_date'],
                'stainCode'     =>      $row[$dataType . '_fk'],
                'block'         =>      $row['block']
            ];

        }
    return $jsonObj;
    }

}
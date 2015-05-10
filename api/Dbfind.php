<?php
	
	/*The purpose of this file is to make a class that can call
	 * various pieces of data from the data table. For example,
	 * I plan to make an ihc look up table that will have the fk of the
	 * case in question, the immunostain, and the block upon which the
	 * stain was ordered.
	 */


class Dbfind {
	
	private function returnDsn($dbhost, $dbname){
        $strOut = 'mysql:charset=utf8;port=3306;dbname=' . $dbname . ';host=' . $dbhost;
        return $strOut;   
	}

    public function mkPdo () {

        $ipageroot = "/home/users/web/b1162/ipg.pathappsnet";
		$mamproot = "/Users/emilypatonay/mylocalsites/pathappsnet";
		$docRoot = $_SERVER['DOCUMENT_ROOT'];

		if ($docRoot === $ipageroot) {
			// echo "<br> This is on iPage.<br>";
			
			try {
				$dsn = $this->returnDsn('pathappsnet.ipagemysql.com', 
						'work_organization');
				$pdo = new PDO($dsn, 'pathappsnet', 'Ap>gO%19');
				$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				// echo 'Successfully connected to iPage mySQL.<br>';
			
			} catch (PDOException $e) {
				$outStr = 'Grr! Unable to connect to iPage mySQL. <br>';
				$outStr .= $e->getMessage();
				return $outStr;
				
			}
			
		} else {

			try {
				$dsn = $dsn = 'mysql:unix_socket=/Applications/MAMP/tmp/mysql/mysql.sock;dbname=work_organization';
				$pdo = new PDO($dsn, 'testroot', 'testroot');
				$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				
				// return 'Successfully connected to localhost mySQL.';
				
			} catch (PDOException $e) {
				$outStr = 'Grr! Unable to connect to MAMP mySQL. <br>';
				$outStr .= $e->getMessage();
				return $outStr;
			}
			
		}  
		return $pdo;     
	}


    /**
     * @param $pdo
     * @return array
     */
    public function pendCases($pdo) {

        $sql = 'SELECT * FROM active_cases WHERE is_active = 1';
        try {
            $s = $pdo->query($sql);
            return $s;
            while ($row = $s->fetch()){
                $outArr[] = array(
                    'idPk'      => $row['id_pk'],
                    'wheelNum'  => $row['wheel_num'],
                    'year'      => $row['year'],
                    'accNum'    => $row['acc_num']
                );
            };
        } catch (PDOException $e) {
            echo "Didn't work, pardner.";
        }
        return $outArr;
    }

    public function formatAccNum ($numwheel, $year, $accnum)  {
        // making the accession number what I am used to seeing it as
        $yearout = substr($year, 2, 2);
        $strout = $numwheel . $yearout . '-' . $accnum;
        return $strout;
    }
}




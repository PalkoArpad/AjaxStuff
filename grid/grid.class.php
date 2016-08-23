<?php

require_once ('config.php');
session_start();

class Grid
{
    //grid pages count
    private $mTotalPages;
    //grid items count
    private $mTotalItemsCount;
    private $mItemsPerPage;
    private $mCurrentPage;

    private $mSortColumn;
    private $mSortDirection;
    //database handler
    private $mMysqli;

    function __construct($currentPage=1, $itemsPerPage=5,
                         $sortColumn='product_id',$sortDirection='asc')
    {
        //create db connection
        $this->mMysqli = new mysqli(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);
        $this->mCurrentPage = $currentPage;
        $this->mItemsPerPage = $itemsPerPage;
        $this->mSortColumn = $sortColumn;
        $this->mSortDirection = $sortDirection;
        //call countAllRecords to get the nr of grid records
        $this->mTotalItemsCount = $this->countAllItems();
        if($this->mTotalItemsCount > 0)
            $this->mTotalPages = ceil($this->mTotalItemsCount/$this->mItemsPerPage);
        else
            $this->mTotalPages = 0;
        if($this->mCurrentPage > $this->mTotalPages)
            $this->mCurrentPage = $this->mTotalPages;
    }

    //read a page of products and save it thi $this->grid
    public function getCurrentPageItems()
    {
        //create sql query that returns a page of products
        $query = 'SELECT * FROM product
                  ORDER BY ' .
                  $this->mMysqli->real_escape_string($this->mSortColumn) .
                  ' ' . $this->mMysqli->real_escape_string($this->mSortDirection);
        //do not put $limit*(page-1)
        $start = $this->mItemsPerPage * $this->mCurrentPage - $this->mItemsPerPage;

        if($start < 0)
            $start = 0;
        $query .= ' LIMIT ' . $start . ',' . $this->mItemsPerPage;

        //execute the query
        if($result = $this->mMysqli->query($query)){
            for($i = 0; $items[$i] = $result->fetch_assoc(); $i++)
                $array = $items;

            //close the result stream and return the results
            $result->close();
            return $array;
        }
    }

    public function getTotalPages()
    {
        return $this->mTotalPages;
    }

    //update a product
    public function updateItem($id, $on_promotion, $price, $name)
    {
        //escape input data for safely using it in SQL statements
        $id = $this->mMysqli->real_escape_string($id);
        $on_promotion = $this->mMysqli->real_escape_string($on_promotion);
        $price = $this->mMysqli->real_escape_string($price);
        $name = $this->mMysqli->real_escape_string($name);
        //build the sql query that updates a product record
        $query = 'UPDATE product SET name ="' . $name . '",
                  ' . 'price=' . $price . ',' .
                  'on_promotion=' . $on_promotion .
                  ' WHERE product_id=' . $id;
        //execute the sql command
        $this->mMysqli->query($query);
        return $this->mMysqli->affected_rows;
    }

    //returns the total number of records for the grid
    private function countAllItems()
    {
        //the query that returns the record count
        $count_query = 'SELECT COUNT(*) FROM product';
        //execute the query and fetch the result
        if($result = $this->mMysqli->query($count_query)){
            //retrieve the first returned row
            $row = $result->fetch_row();
            //close the db handle
            $result->close();
            return $row[0];
        }
        return 0;
    }

    public function getTotalItemsCount()
    {
        return $this->mTotalItemsCount;
    }

    //end class Grid
}
?>
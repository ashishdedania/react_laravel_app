<?php

/**
 * Formate date function
 *
 * @param string $date 
 *
 * @return string Return date dd/mm/YYYY
 */
if (! function_exists('convertToddmmyyy')) {
    function convertToddmmyyy($date)
    {
        return date('d/m/Y',strtotime(date('Y-m-d h:i:s', strtotime($date))));
    }
}

/**
 * Formate price function
 *
 * @param float $price 
 *
 * @return float Return float value with 2 decimal place
 */
if (! function_exists('formatePrice')) {
    function formatePrice($price)
    {
        return number_format($price, 2, '.', '');
    }
}

?>
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Message extends Model
{
     /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

     public function scopegetSenderName($query){
          $query = DB::table('messages as m')
          ->leftJoin('users as u', 'm.user_id','u.user_id')
          ->select('u.first_name','m.message','m.user_id')
          ->get();
          return $query;
     }
    

}

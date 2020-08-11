<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use App\User;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Auth;

class ChatsController extends Controller
{

    // public function __construct(){
    //     $this->middleware('auth');
    // }

    public function fetchMessages(){
        return response()->json(Message::getSenderName()); 
    }

    public function sendMessage(Request $request){

        $user_id = $request->input('user');
        $user = User::findOrFail($user_id);

        $message = new Message();
        $message->user_id = $request->input('user');
        $message->message = $request->input('message');
        $message->save();

        broadcast (new MessageSent($message, $user))->toOthers();

    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Message;
use App\Events\MessageSent;

class ChatsController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function index(){
        return view('home');
    }

    public function fetchMessages(){
        return Message::getSenderName();
    }

    public function sendMessage(Request $request){
        $message = new Message();
        $message->user_id = $request->input('user');
        $message->message = $request->input('message');
        $message->save();

        broadcast(new MessageSent($message))->toOthers();

    }

}

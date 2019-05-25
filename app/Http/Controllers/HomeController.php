<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App;
use DB;
use App\Quotation;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Input;
use App\Support\Authorization\AuthorizationUserTrait;


class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
   
   
     public function index()
    {   $conn = DB::connection("mysql");
        $usuarios = $conn->select('select * from (select b.id_game, b.id ,u.name, b.score from batallanaval b 
                                                    join users u on(b.id=u.id) order by `id`, score desc, id) x group by `id`');
                                


        $scoreBN = DB::table('batallanaval')
                                ->orderBy('score','desc')
                                ->where('id',auth()->user()->id)
                                ->get();
        return view('home',compact('usuarios', 'scoreBN'));
    }

    public function bnaval(){

       // $usuarios = App\User::where('id',auth()->user()->id)->get();
        $usuarios = App\User::find(auth()->user()->id);
        //$usuarios->score=55;
        //$usuarios->save();

        return view('bnaval', compact('usuarios'));
    }

    public function update(Request $request)    {
        /* 
        $user = App\User::find(auth()->user()->id);      
        /*$score1 = Input::get('score');
        $user->score = $score1;
        $user->save();*/
        //$score = $request->input('score'); // This is better than using $_POST
        //$conn = DB::connection("mysql");
        //$conn->update('update users set score=? where id=?',[$score,$user]);
        //$user->score = $score;
        //$user->save();
        
        $this->validate($request,[ 
            'score' => 'required'
        ]);

        $user = App\Models\batallanaval::find(1);
        $user->score = $request->get('score');
        $user->save();
        
        return redirect()->route('bnaval')->with('success', 'Data updated');
        //->with('success','Registro actualizado satisfactoriamente');
 
    }

}

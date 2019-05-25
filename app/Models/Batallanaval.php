<?php

/**
 * Created by Reliese Model.
 * Date: Tue, 21 May 2019 16:30:26 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Batallanaval
 * 
 * @property int $id_game
 * @property int $id
 * @property int $score
 * 
 * @property \App\Models\Batallanaval $batallanaval
 * @property \Illuminate\Database\Eloquent\Collection $batallanavals
 *
 * @package App\Models
 */
class Batallanaval extends Eloquent
{
	protected $table = 'batallanaval';
	protected $primaryKey = 'id_game';
	public $timestamps = false;

	protected $casts = [
		'id' => 'int',
		'score' => 'int'
	];

	protected $fillable = [
		'id',
		'score'
	];

	public function batallanaval()
	{
		return $this->belongsTo(\App\Models\Batallanaval::class, 'id', 'id');
	}

	public function batallanavals()
	{
		return $this->hasMany(\App\Models\Batallanaval::class, 'id', 'id');
	}
}

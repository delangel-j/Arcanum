@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    <h3 class="h3">Estos son los puntajes más altos</h3>

      <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Puntaje</th>
          </tr>
          </thead>
          <tbody>
          @foreach($usuarios as $item)  
            <tr>
              <th scope="row">{{ $item->id }}</th>
              <td>{{ $item->name }} </td>
              <td> {{ $item->score }}</td>
            </tr>
          @endforeach
        </tbody>

        </table>


                    

                    
                </div>
            </div>
        </div>
    </div>
</div>

<div class="container mt-5" >
<div class="card" style="width: 18rem;">
  <img src="images/barco.jpg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Batalla naval</h5>
    <p class="card-text">¡La Batalla Naval ha comenzado! Adivina la posición de tu oponente, dispárale y debilita sus barcos. Sólo habrá un vencedor/a</p>
    <a href="{{url('/bnaval/')}}" class="btn btn-primary">Ir a la batalla</a>
  <div class="mt-5">
    <table class="table">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Puntaje</th>
          </tr>
          </thead>
          <tbody>
          <h3 class="h3">Tus mejores puntajes</h3>
          @foreach($scoreBN as $item2)  
            <tr>
              <th scope="row">{{ $item2->id_game }}</th>
              <td>{{ $item2->score }} </td>
            </tr>
          @endforeach
        </tbody>

        </table>
        </div>
  </div>
</div>
</div>
@endsection
